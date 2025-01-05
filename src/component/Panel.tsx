import { PanelProp } from '@/utils/type'

const Panel = ({attributes} : {attributes : PanelProp}) => {

  return (

      <div className=" flex flex-col justify-center items-center pr-3 ">
        <div className=" text-sm text-black-2 font-light flex gap-1 items-center">
          <img src={attributes.img} width={15} />
          <span>{attributes.title}</span>
        </div>
        <div>
          <span className=" text-white-2">
            {attributes.data}
          </span>
        </div>
      </div>
  );
}

export default Panel