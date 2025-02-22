import { attributesProps } from "./type";



export const StoryCategory = [
  {
    img: "/Story-Website/write.jpg",
    text: "Generate a Story",

  },
  {
    img: "/Story-Website/aiwrite.jpg",
    text: "Write a Story",
  },
];

export const RichStyle = [
  {
    Style: "BOLD",
    icon: "/Story-Website/RichStyle/bold.svg",
  },
  {
    Style: "ITALIC",
    icon: "/Story-Website/RichStyle/italic.svg",
  },
  {
    Style: "UNDERLINE",
    icon: "/Story-Website/RichStyle/underline.svg",
  },
  {
    Style: "STRIKETHROUGH",
    icon: "/Story-Website/RichStyle/strike.svg",
  },
  {
    Style: "CODE",
    icon: "/Story-Website/RichStyle/code.svg",
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
    img: "/Story-Website/list.svg",
  },
  {
    title: "Followers",
    img: "/Story-Website/people.svg",
  },
];



export const StoryAttributes = [
  {
    title: "Likes",
    img: "/Story-Website/heart.svg",
  },
  {
    title: "Parts",
    img: "/Story-Website/list.svg",
  },
];


export const cards = [
  {
    pic: "/Story-Website/draw.svg",
    title: "hi how are ",
  },
  {
    pic: "/Story-Website/draw1.svg",
    title: "hi how are ",
  },
  {
    pic: "/Story-Website/draw2.svg",
    title: "hi how are ",
  },
  {
    pic: "/Story-Website/draw3.svg",
    title: "hi how are ",
  },
  {
    pic: "/Story-Website/draw3.svg",
    title: "hi how are ",
  },
  {
    pic: "/Story-Website/draw3.svg",
    title: "hi how are ",
  },
];


export  const genreColors = [
  { genre: "Fantasy", color: "#D8BFD8", hoverColor: "#C0A0C0" }, // Deeper purple for hover
  { genre: "Comedy", color: "#FFF8DC", hoverColor: "#FFE4B5" }, // Light golden shade for hover
  { genre: "Adventure", color: "#C1E1C1", hoverColor: "#A0D0A0" }, // Deeper green for hover
  { genre: "Mystery", color: "#D1D9E6", hoverColor: "#B0C0D0" }, // Darker steel blue for hover
  { genre: "Sci-Fi", color: "#B4DDED", hoverColor: "#90C8E0" }, // Deeper cyan for hover
  { genre: "Romance", color: "#FADADD", hoverColor: "#F5B5C5" }, // Warmer pink for hover
  { genre: "Horror", color: "#F4CCCC", hoverColor: "#E09A9A" }, // Darker coral for hover
  { genre: "Historical", color: "#F5DEB3", hoverColor: "#EEC58A" }, // Golden wheat shade for hover
  { genre: "Thriller", color: "#C8D6E5", hoverColor: "#A8BCCF" }, // Darker gray-blue for hover
  { genre: "Poetry", color: "#E3F2FD", hoverColor: "#B0DAF0" } // Richer baby blue for hover
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
  if(attributes.hasOwnProperty("underline")) style += " underline "
  if(attributes.hasOwnProperty("color")) style += `text-[${attributes.color}] `

  return style
}


export default handleAttributes