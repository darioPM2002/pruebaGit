#Recibe una string 2 y conesta true si el string es aceptado por el DFA

def name(w):
    estado = 0
    for item in w:
        if estado ==0:
          if item == "a":
            estado = 0
          elif item == "b":
             estado = 1
          else: return False   
        elif estado ==1:
           if item == "a":
            estado = 0
           elif item == "b":
             estado = 2
           else: return False   
        elif estado ==2:   
           if item == "$" :
             return True
           else:
              if item == a:
                estado = 2
              elif condition:
                pass

     

