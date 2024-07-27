import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReposList } from '../../states/common/common.selector';
import * as d3 from 'd3';

@Component({
  selector: 'app-repository-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './repository-bar-chart.component.html',
  styleUrl: './repository-bar-chart.component.scss',
})
export class RepositoryBarChartComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  private store = inject(Store);
  repos!: any[];

  ngOnInit(): void {
    this.store.select(selectReposList).subscribe((repos) => {
      if (repos && repos.length) {
        this.repos = repos.filter(
          (d) => d.name !== 'coding-interview-university'
        );

        this.createChart();
      }
    });
  }

  createChart() {
    if (!this.repos) return;

    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', 800)
      .attr('height', 600)
      .attr('overflow', 'visible');

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg
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
      .selectAll('text') // Select all text elements for the x-axis
      .attr('transform', 'rotate(-45)') // Rotate them 45 degrees
      .style('text-anchor', 'end') // Align text to the end
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
      .attr('x', (d) => x(d.name) || 0) // Ensure x(d.name) is not undefined
      .attr('y', (d) => y(d.stargazerCount) || 0) // Ensure y(d.stargazerCount) is not undefined
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - (y(d.stargazerCount) || 0)) // Ensure y(d.stargazerCount) is not undefined
      .attr('fill', '#25407a'); // Color scale
  }
}
