



const Heart = ({Color,handleClick} : {Color : string , handleClick : () => Promise<void>}) => {
    return (
        
        <div onClick={() => handleClick()} className="w-[20px] cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                          stroke={Color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                    </path>
                </g>
            </svg>
        </div>

    )
}


const Bell = ({clicked} : {clicked :boolean}) => {
    
    return (
      <div>
        {!clicked ? (
          <svg
            className="w-7 h-7 text-black-2 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
            />
          </svg>
        ) : (
          <svg
            className="w-7 h-7 text-black-2  dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
          </svg>
        )}
      </div>
    );
}



const Save =  ({clicked , handleClick } : {
  clicked : boolean
  handleClick : () => void
}) => {

  return (
    <div className=" w-[10px] cursor-pointer" onClick={handleClick}>
      {clicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path d="M 16.5 5 C 12.928062 5 10 7.9280619 10 11.5 L 10 41.5 A 1.50015 1.50015 0 0 0 12.376953 42.716797 L 24 34.347656 L 35.623047 42.716797 A 1.50015 1.50015 0 0 0 38 41.5 L 38 11.5 C 38 7.9280619 35.071938 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 33.450062 8 35 9.5499381 35 11.5 L 35 38.572266 L 24.876953 31.283203 A 1.50015 1.50015 0 0 0 23.123047 31.283203 L 13 38.572266 L 13 11.5 C 13 9.5499381 14.549938 8 16.5 8 z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
        >
          <path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"></path>
        </svg>
      )}
    </div>
  );
}



const Plus = ({Color , classes} : {Color:string , classes : string}) => {
    return (
        <div className={`cursor-pointer ${classes} `}>
            <svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus [#1512]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-379.000000, -240.000000)" fill={Color}> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="plus-[#1512]" points="344 89 344 91 334.55 91 334.55 100 332.45 100 332.45 91 323 91 323 89 332.45 89 332.45 80 334.55 80 334.55 89"> </polygon> </g> </g> </g> </g></svg>
        </div>
    )
}

export const Icon = {
    heart: Heart,
    plus:Plus,
    bell : Bell,
    save : Save
}