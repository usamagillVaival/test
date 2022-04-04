export const recentlyadded=(f,l) =>
{
   var fname=new Date(f?.createdAt)
   var lname=new Date(l?.createdAt)
       
   if(fname >lname)
   return -1;
else if(fname < lname)
   return 1;
   return 0;
}
export const priceLowToHigh=(f,l) =>
{
   var fname=f?.price
   var lname=l?.price
       
   if(fname >lname)
   return 1;
else if(fname < lname)
   return -1;
   return 0;
}
export const priceHighToLow=(f,l) =>
{
   var fname=f?.price
   var lname=l?.price
       
   if(fname <lname)
   return 1;
else if(fname > lname)
   return -1;
   return 0;
}
export const descendingDate=(f,l) =>{
   var fname=new Date(f?.createdAt)
   var lname=new Date(l?.createdAt)
       
   if(fname >lname)
   return -1;
else if(fname < lname)
   return 1;
   return 0;
       

}
export const assendingSorting=(f,l) =>
{
   var fname=f?.title
   var lname=l?.title
       
   if(fname?.localeCompare(lname) < 0)
   return -1;
else if(fname?.localeCompare(lname) > 0)
   return 1;
else if(fname?.localeCompare(lname) == 0)
   return 0;
}
export const descendingSorting=(f,l) =>
{
   var fname=f?.title
   var lname=l?.title
       
   if(fname?.localeCompare(lname) > 0)
   return -1;
else if(fname?.localeCompare(lname) < 0)
   return 1;
else if(fname?.localeCompare(lname) == 0)
   return 0;
}