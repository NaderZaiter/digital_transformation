sequelize model:generate --name User --attributes id:integer,name:string,surname:string,user:string, password:string, email:string, permission:boolean --force

sequelize db:migrate
