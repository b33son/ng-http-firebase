import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  appName = this.serverService.getAppName();

  servers = [
    {
      name: 'Test 0001',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Live 0001',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverService: ServerService) {

  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    })
  }

  onSave() {
    this.serverService.storeServers(this.servers).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onGet() {
    this.serverService.getServers().subscribe(
      (servers: any[]) => {
        this.servers = servers
      },
      (error) => console.log(error)
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
