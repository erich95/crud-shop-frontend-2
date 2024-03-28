import { Component, OnInit } from '@angular/core';
import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit{

  stockList!: Stock[];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getAllStock().subscribe(
      response => {
        this.stockList = response.stocks
        
      }
    )
  }

}
