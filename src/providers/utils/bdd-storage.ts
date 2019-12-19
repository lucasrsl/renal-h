import { Storage } from "@ionic/storage";

export class BddStorage{
  storage = new Storage({});
  constructor(){
  }

  add(key,value){
    this.get(key,(res)=>{
      if(res){
        let values = res;
        values.push(value);
        this.storage.set(key,values);
      }else{
        this.storage.set(key,[]);
      }
    })

  }
  get(key,callback){
    this.storage.get(key).then((res)=>{
      if(res){
        callback(res);
      }else{
        callback([]);
      }
    });
  }
  delete(key,callback){
    this.storage.remove(key).then(callback(true),callback(false));
  }
  addItem(key,value, callback){
    let values:any;
    this.storage.get(key).then((res)=>{
      values = res;
      if(values){
        values.push(value);
        this.storage.set(key,values).then(callback());
      }else{
        let list = [];
        list.push(value);
        this.storage.set(key,list).then(callback());
      }
    });

  }
  getItemById(key,id,callback){
    let values:any;
    let hasItem = false;
    this.storage.get(key).then((res)=>{
      values = res;
      for(let item of values){
        if(item.id==id){
          hasItem = true;
          callback(item);
        };
      };
      if(!hasItem){
        callback(false);
      };
    });

  }
  setItemById(key,id,val){
    let values:any;
    this.storage.get(key).then((res)=>{
      values = res;
      let newValues:any=[];
      for(let item of values){
        if(item.id==id){
          item = val;
        }
        newValues.push(item);
      }
      this.storage.set(key,newValues);
    })

  }
  removeItemById(key,id,callback){
    let values:any;
    this.storage.get(key).then((res)=>{
      values = res;
      for(let i=0; i<values.length; i++){
        if(values[i].id==id){
          values.splice(i, 1);
        }
      }
      this.storage.set(key,values).then((res)=>{
        callback(res);
      },()=>{
        callback(false);
      });
    });

  }
}
