import React,{useEffect,useState} from "react"
function SmartContractGalleryList( {items, curPage, itemLimit})
{
    const [curItems, setCurItems] = useState([]);
    useEffect(() => {
        const offset = curPage * itemLimit;
        const getList = (curPage, itemLimit) => {
          setCurItems(items.slice(offset, offset + itemLimit));
        };
        getList(curPage, itemLimit);
  }, [curPage, itemLimit, items]);
  return (
      <>
  
    </>
  )

}
export default SmartContractGalleryList