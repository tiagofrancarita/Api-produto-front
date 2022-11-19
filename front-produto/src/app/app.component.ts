import { Produto } from './model/produto';
import { ProdutoService } from './service/produto.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {


  produtoForm = this.fb.group({
    id: [null],
    nome: [null, Validators.required],
    descricao: [null],
    preco: [null, Validators.required]
  })


  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService){

  }

  criarProduto(): Produto {
    return {

      id: this.produtoForm.get('id')?.value,
      nome: this.produtoForm.get('nome')?.value,
      preco: this.produtoForm.get('preco')?.value,
      descricao: this.produtoForm.get('descricao')?.value
    }
  }

  salvar(){

    if(this.produtoForm.valid){
      const produto = this.criarProduto();
      console.log('Produto:', produto);

      this.produtoService.salvar(produto).subscribe({
        next: (res) => {
          alert("Cadastro de produto realizado com sucesso !")
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }
  }
}
