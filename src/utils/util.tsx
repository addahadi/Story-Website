import { attributesProps } from "./type";

export const LeftSideCom = [
    {
        title:"Home",
        icon:"../public/home.svg",
        path:"/"
    },
    {
        title:"Write-Story",
        icon:"../public/create.svg",
        path:"/write"
    },
    {
        title:"Discover",
        icon:"../public/people.svg",
        path:"/people"
    },
    {
        title:"Profile",
        icon:"../public/profile.svg",
        path:"/profile"
    },
]

export const StoryCategory = [
  {
    img: "../public/write.jpg",
    text: "Generate a Story",

  },
  {
    img: "../public/aiwrite.jpg",
    text: "Write a Story",
  },
];

export const RichStyle = [
  {
    Style: "BOLD",
    icon: "../public/RichStyle/bold.svg",
  },
  {
    Style: "ITALIC",
    icon: "../public/RichStyle/italic.svg",
  },
  {
    Style: "UNDERLINE",
    icon: "../public/RichStyle/underline.svg",
  },
  {
    Style: "STRIKETHROUGH",
    icon: "../public/RichStyle/strike.svg",
  },
  {
    Style: "CODE",
    icon: "../public/RichStyle/code.svg",
  },
];

export const fontSizeStyleMap = {
  'FONT_SIZE_12': { fontSize: '12px' },
  'FONT_SIZE_16': { fontSize: '16px' },
  'FONT_SIZE_20': { fontSize: '20px' },
  // Add more font sizes as needed
};




export const StoryProp = [
  {
    title : "Votes",
    icon : ""
  },
  {
    title : "Parts",
    icon : ""
  },
]


export const ProfileAttributes = [
  {
    title: "Posts",
    img: "../../public/list.svg",
  },
  {
    title: "Followers",
    img: "../../public/people.svg",
  },
];



export const StoryAttributes = [
  {
    title: "Likes",
    img: "../public/heart.svg",
  },
  {
    title: "Parts",
    img: "../public/list.svg",
  },
];


export const cards = [
  {
    pic: "../public/draw.svg",
    title: "hi how are ",
  },
  {
    pic: "../public/draw1.svg",
    title: "hi how are ",
  },
  {
    pic: "../public/draw2.svg",
    title: "hi how are ",
  },
  {
    pic: "../public/draw3.svg",
    title: "hi how are ",
  },
  {
    pic: "../public/draw3.svg",
    title: "hi how are ",
  },
  {
    pic: "../public/draw3.svg",
    title: "hi how are ",
  },
];


export const genreColors = [
  { genre: "Fantasy", color: "#D8BFD8" }, // Thistle (soft purple with a magical vibe)
  { genre: "Comedy", color: "#FFF8DC" }, // Cornsilk (cheerful light yellow)
  { genre: "Adventure", color: "#C1E1C1" }, // Light Green (fresh and vibrant)
  { genre: "Mystery", color: "#D1D9E6" }, // Light Steel Blue (calm and mysterious)
  { genre: "Sci-Fi", color: "#B4DDED" }, // Light Cyan (clean and futuristic)
  { genre: "Romance", color: "#FADADD" }, // Light Pink (romantic and warm)
  { genre: "Horror", color: "#F4CCCC" }, // Light Coral (soft reddish tone)
  { genre: "Historical", color: "#F5DEB3" }, // Wheat (timeless and elegant)
  { genre: "Thriller", color: "#C8D6E5" }, // Light Slate Gray (tense and clean)
  { genre: "Poetry", color: "#E3F2FD" } // Baby Blue (calm and ethereal)
];


export function getTextColor(backgroundColor : string) {

  const rgb = parseInt(backgroundColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;


  const brightness = (r * 299 + g * 587 + b * 114) / 1000;


  return brightness > 180 ? "#333333" : "#FFFFFF";
}

export const  currentpage = ["Write" ,"Home", "Discover" , "Profile"]



function handleAttributes(attributes : attributesProps){
  let style = ""
  if(attributes.hasOwnProperty("bold")) style += " font-semibold "
  if(attributes.hasOwnProperty("header")) style += ` text-[${attributes.header}rem] `;
  if(attributes.hasOwnProperty("italic")) style += " italic"
  if(attributes.hasOwnProperty("underline")) style +=" underline "
  if(attributes.hasOwnProperty("color")) style += ` text-[${attributes.color}] `
  console.log(style)
  return style
}


export default handleAttributes