import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  public alertButtons = ['Oui'];

  constructor() { }

  ngOnInit() {
  }

}
