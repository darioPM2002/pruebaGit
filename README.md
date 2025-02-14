![Gitgub Logo](/github-logo-vector.png)
# Laboratorio-git  :star: :star: :star:
## Git es un servicio para crear repositorios, editarlos y trabajarolos tanto local, como vía remota. Hay una serie de pasos y comandos para poder hacer tus repositorios
________________________________________________________________
:warning::warning::warning::warning::warning::warning: **Si ya tienes tu ssh :key: agregado a la página de git adellantate al paso 3**

 *:one:*  Abrimos git bash, nos situamos en alguna carpeta, de preferencia con el nombre ".ssh", ya que no situamos aquí ingresamos el comando  **ssh-keygen -t ed25519 -C "<Tú e-mail de github>"**, nos va generar dos archivos, :key: estos archivos serán nuestras credenciales para poder ingresar y editar nuestro repositorio remoto.

 *:two:* En la página de github, ya loggeados hacemos lo siguiente: **settings>SSH and GPG keys>New SSH key**,  ahí ingresamos un título como identificador de la llave, en key type es "Authentication Key" y en key vamos a pegar lo siguiente, abrimos un git bash, y metemos la siguiente línea de código **clip < ~/.ssh/id_ed25519.pub** esta es la ruta de uno de los archivos que generamos en el punto anterior, :arrow_up: la ssh :key: estará en el portapapeles sólo tendremos que pegarla.


* *****

 *:three:*  En la página de git creamos un repositorio, vamos a la página del repositorio y en "code" buscamos la ssh, es un link.

 *:four:*  Con la llave de ssh vamos a una carpeta en nuestra computadora, mediante git bash entras a la carpeta en donde queremos hacer el repositorio local

 * Comandos de la consola :computer:: 
        
        ls // Nos muestra todos los archivos y carpetas de la raiz en dode estamos 
        ls -a // Nos muestra todos los archivos y carpetas incluyendos los archivos ocuktos
        cd <nombre_de_la_carpeta> // Entramos a una carpeta
        cd .. //Regresamos a una carpeta antes de donde estamos
 *:five:* En git bash metemos el código git clone usando el ssh que nos dió la website de nuestro repositorio

 * Comandos de git :cat:: 
        
        ssh-keygen -t ed25519 -C "<Tú e-mail de github>" // Creamos los archivos ssh locales
        git clone <ssh del repositorio> // Clonamos un repositorio a la raiz donde estamos
        git add - A  // registrar que archivos nuevos hay en el repositorio para pasarlos a revisión 
        git commit -m "nombre del cambio" // con este se guardan los cambios 
        git status // status de git
        git push -u origin main // sube los cambios al repositorio en línea 
        git pull origin main//bajar el repositorio remoto al repositorio local

*:six:* Con el repositorio ya creado localmente tenemos que seguir este orden para poder guardar y actualizar nuestros cambios **que estén unicamente en la carpeta donde tenemos el repositorio(donde hicimos el *git clone,*** el orden será el siguiente:

        git add - A
:arrow_down:

        git commit -m "nombre del cambio"
:arrow_down:

      git push -u origin main 


Por último si queremos sincronizar nuestro repositorio local con el repositorio remoto se ingresa el siguiente código:
        git pull origin main

### Ejemplos de códigos
For Python
```python
for i in range(5):
    print(i)
```
### Ejemplos de listas
- [x] Turn on GitHub Pages
- [ ] Outline my portfolio
- [ ] Introduce myself to the world


#Referencias :link:

* [Github documentation](https://docs.github.com/en)

* [Github glossary](https://docs.github.com/en/get-started/learning-about-github/github-glossary)

* [Git documentation](https://git-scm.com/doc)
