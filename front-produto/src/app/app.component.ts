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

  produtos: Produto[] = [];

  produtoForm = this.fb.group({
    id: [],
    nome: [null, Validators.required],
    descricao: [null],
    preco: [null, Validators.required]
  })


  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
    ) {
    this.buscarProdutos();
  }

  buscarProdutos(){
    this.produtoService.buscarTodos().subscribe(
      {
      next: (res) =>{
      this.produtos = res;
      },
      error:(error) =>{
        console.log(error);
      },
      complete: () => console.log('lista de produtos', this.produtos)
    })
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
          this.produtoForm.reset(); // Apaga todo o conteudo das caixas de texto após salvar no banco.
          this.buscarProdutos(); // Realiza uma nova busca no banco de dados e atualiza a grid
          alert("Cadastro de produto realizado com sucesso !")
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }
  }

  remover(produto: Produto){
    const confirmacao = confirm("Prezado usuário(a), deseja realmente excluir o produto: " + produto.nome);
    if(confirmacao){
      const idProduto = produto.id;
      this.produtoService.remover(idProduto).subscribe({
          next: (res) => {
            alert("Produto excluído com sucesso !")
            this.buscarProdutos(); // Realiza uma nova busca no banco de dados e atualiza a grid
          },
          error: (error) =>{
            console.log(error);
          }
      })
    }
  }
}
