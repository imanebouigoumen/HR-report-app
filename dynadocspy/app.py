from flask import Flask,render_template
import os
import json
from pathlib import Path
from collections import defaultdict

app=Flask(__name__)

@app.route('/')
def welcome():
    big_dic=dict()

    document=Path('rapports')
    fichiers=list(document.iterdir())
    taille=len(fichiers)
    i=0
    while i < taille :
         fichier=fichiers[i]
        
         nomfich = fichier.stem
         nomcand=nomfich.split('-')[1]
         prenomcand=nomfich.split('-')[2]
         liste=[]
         
         with open (fichier,"r")as f:
             data=json.load(f)
             liste.append(data)
            
             note=int(data["Note"])   
             for j in range(i+1,taille) :
              
              fichier2=fichiers[j]
              nomfich2 = fichier2.stem
              if nomfich2.split('-')[1]== nomcand and prenomcand==nomfich2.split('-')[2] :
                with open (fichier2,"r")as f:
                   data=json.load(f)
                   liste.append(data)
                   i += 1
                   
                   note=note+int(data["Note"])
         moy=int(note) // len(liste)
         liste.append(moy)
         print(liste)
         i += 1
         big_dic[nomcand+" "+prenomcand] = liste
    print(big_dic)
    sorted_dict = dict(sorted(big_dic.items(), key=lambda item: item[1][-1], reverse=True))
    print(sorted_dict)
    return render_template('index.html',dic=sorted_dict)


if __name__ == "__app__":
    app.run(debug=True)

