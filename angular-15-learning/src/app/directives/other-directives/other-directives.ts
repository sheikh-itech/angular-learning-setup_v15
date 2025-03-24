import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'other-directives',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './other-directives.html',
    styleUrls: ['./other-directives.css']
})
export class OtherDirectives {

    showText: boolean = false;
    isChecked: boolean = false;
    isVisible: boolean = false;
    color: String = "";
    isActive: boolean = true;
    numbers: number[] = [5, 10, 12, 9];

    fruits: String[] = ["Apple", "Mango", "Papaya", "Banana"];
    persons: Person[] = [];

    constructor() {

        this.persons = [
            new Person(101, 'Arham', 'Srinagar'),
            new Person(102, 'Fatima', 'Srinagar'),
            new Person(103, 'Hapheej', 'Bheda')
        ];
    }

    onChange(event: Event) {

        this.showText = (event.target as HTMLInputElement).checked;
    }

    onChange1(event: Event) {

        this.isVisible = (event.target as HTMLInputElement).checked;
    }

    updateColor(event: Event){
        this.color = (event.target as HTMLInputElement).value;
    }

    public getNewPersons(): void {

        this.persons.push(
            new Person(104, "Ammi", "Bhede"),
            new Person(105, "Haleem", "Punasa"),
            new Person(106, "Uzair", "Punasa")
        );
    }
    public getMorePersons(): void {
        
        this.persons = [
            new Person(101, 'Arham', 'Srinagar'),
            new Person(102, 'Fatima', 'Srinagar'),
            new Person(103, 'Hapheej', 'Bheda'),
            new Person(104, "Ammi", "Bhede"),
            new Person(105, "Haleem", "Punasa"),
            new Person(106, "Uzair", "Punasa")
        ];
    }

    public trackByPersonName(index: any, person: Person): String{

        return person.name;
    }

    getDynamicStyles() {
        return {
          'color': 'purple',
          'padding': '10px',
          'text-decoration': 'underline'
        };
    }
    
    getClass(type: string) {

        let classType;
        if(type=='red')
            classType = {
                'text-green': true
            }
        else
            classType = {
                'text-font': true
            }

        return classType;
    }
}

export class Person {
    id: number;
    name: string;
    city: string;
  
    constructor(id: number, name: string, city: string) {
      this.id = id;
      this.name = name;
      this.city = city;
    }
  
    public getDetails(): string {
      return `Student: Id: ${this.id}, Name: ${this.name}, Place: ${this.city}`;
    }
  }
  