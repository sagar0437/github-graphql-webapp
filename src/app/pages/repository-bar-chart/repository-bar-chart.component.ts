import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReposList } from '../../states/common/common.selector';
import * as d3 from 'd3';
import { IRepository } from '../../common/models/common.model';

@Component({
  selector: 'app-repository-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './repository-bar-chart.component.html',
  styleUrl: './repository-bar-chart.component.scss',
})
export class RepositoryBarChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  private store = inject(Store);
  repos!: IRepository[];
  chartWidth!: number;
  svg: any;

  ngOnInit(): void {
    this.store.select(selectReposList).subscribe((repos) => {
      if (repos && repos.length) {
        this.repos = repos;
        this.createChart();
      }
    });
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  createChart() {
    if (!this.repos) return;

    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove();

    this.chartWidth = element.getBoundingClientRect().width;
    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', 600)
      .attr('overflow', 'visible');

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +this.svg.attr('width') - margin.left - margin.right;
    const height = +this.svg.attr('height') - margin.top - margin.bottom;
    const g = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(this.repos.map((d) => d.name));
    y.domain([0, d3.max(this.repos, (d) => d.stargazerCount) || 0]);

    const xAxis = g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    xAxis
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '10px');

    const yAxis = g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Stars');

    const bars = g
      .selectAll('.bar')
      .data(this.repos)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { name: string }) => x(d.name) || 0)
      .attr(
        'y',
        (d: { stargazerCount: d3.NumberValue }) => y(d.stargazerCount) || 0,
      )
      .attr('width', x.bandwidth())
      .attr(
        'height',
        (d: { stargazerCount: d3.NumberValue }) =>
          height - (y(d.stargazerCount) || 0),
      )
      .attr('fill', '#25407a');
  }

  private onResize() {
    this.chartWidth =
      this.chartContainer.nativeElement.getBoundingClientRect().width;
    this.createChart();
  }
}
