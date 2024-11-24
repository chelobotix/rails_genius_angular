import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-rome',
  standalone: true,
  imports: [],
  templateUrl: './rome.component.html',
  styleUrl: './rome.component.scss',
})
export class RomeComponent implements OnInit {
  rome = `
              ___
              \\\\||
             ,'_,-\\
             ;'____\\
             || =\\=|
             ||  - |
         ,---'._--''-,,---------.--.----_,
        / \`-._- _--/,,|  ___,,--'--'._<
       /-._,  \`-.__;,,|'
      /   ;\\      / , ;
     /  ,' | _ - ',/, ;
    (  (   |     /, ,,;
     \\  \\  |     ',,/,;
      \\  \\ |    /, / ,;
     (| ,^.|   / ,, ,/;
      \`-'./ \`-._,, ,/,;
           �-._ \`-._,,;
           |/,,\`-._ \`-.
           |, ,;, ,\`-._\\
           I Like Rome,
           Let me show you my code skills
           https://www.linkedin.com/in/marceloalarconb/
`

  ngOnInit(): void {
    console.log(this.rome)
  }
}
