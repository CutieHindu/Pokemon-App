import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form-component.css']
})
export class PokemonFormComponent implements OnInit {
picture: any;

  constructor(private serv: PokemonService,
     private router: Router) { }


  Types: string[];
  @Input() pokemon: Pokemon;
  isAddForm: boolean;

  ngOnInit() {
    this.Types = this.serv.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean{
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string){
    const isChecked = ($event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.pokemon.types.push(type);
    }
    else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string):boolean {

    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    
    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      return false;
    }

    return true;
  }

  onSubmit(){
    if(this.isAddForm){
      console.log("im in");
        this.serv.addPokemon(this.pokemon)
        .subscribe((poke: Pokemon) =>
          this.router.navigate(['/pokemon',poke.id]));
    console.log(this.pokemon.id);
    }
    else {
      console.log('submit form !');
      this.serv.updatePokemon(this.pokemon).subscribe
      (() => this.router.navigate(['/pokemon',this.pokemon.id]));
     // this.router.navigate(['/pokemon',this.pokemon.id]);
    }
  }
}
