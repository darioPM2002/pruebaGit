# Implementación de un DFA usando una tabla de transición

#Recibe un string w y contesta el lexer y token

tabla = [[1,6,7,8,0,8],[1,4,4,2,4,8],[3,8,8,8,8,8],[3,5,5,8,5,8]]


b = ' \n\t$'
d = '0123456789'

s = '34+65.43      - 72-40$'
lex = ''
p = 0
estado = 0

while ((s[p] != '$') or (s[p] == "$" and estado !=0 )):
    c = s[p]  
    if c in d:
        col = 0
    elif c == '+':
        col = 1
    elif c == '-':
        col = 2
    elif c == '.':
        col = 3
    elif c in b:
        col = 4
    else:
        col = 5
    
    estado = tabla[estado][col]

    if estado == 4:
        print(lex, 'INT')
        lex = ''
        estado = 0
        p -= 1
    elif estado == 5:
        print(lex, 'REAL')
        lex = ''
        estado = 0
        p -= 1
    elif estado == 6:
        print('+', 'SUMA')
        lex = ''
        estado = 0
    elif estado == 7:
        print('-', 'RESTA')
        lex = ''
        estado = 0
    elif estado == 8:
        print('Error')
        break
        

    p += 1 #Avanzar uno la pos del string

    if estado != 0:
        lex += c


