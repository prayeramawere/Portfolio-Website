let secretCodes = [];
function generateSecretCode() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 17; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  if (checkifCodeExists(result)) {
    return generateSecretCode();
  } else {
    return result;
  }
}
const checkifCodeExists = (code) => {
  const codeExists = secretCodes.find((c) => c === code);
  codeExists ? true : false;
};

const projects = [
  {
    id: 1,
    name: "Ultimate Portfolio",
    description:
      "A comprehensive portfolio website showcasing my skills, projects, and experiences in web development.",
    link: "",
    image: "",
    category: "projects",
  },
  {
    id: 2,
    name: "Task Manager App",
    description:
      "A web application that helps users manage their tasks efficiently with features like task creation, editing, and deletion.",
    link: "",
    image: "",
    category: "projects",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    description:
      "An online platform that allows users to browse and purchase products, complete with a shopping cart and payment integration.",
    link: "",
    image: "",
    category: "projects",
  },
];

const blogs = [
  {
    id: 1,
    date: "12/03/25",
    category: "tech",
    title: "Escaping tutorial Hell",
    subtitle: "make the best out of everything you can",
    description:
      "CDN stands for Content Delivery Network or Content Distribution Network, which is a network of geographically distributed servers that work together to deliver web content faster. CDNs improve website performance by caching copies of a website's files (like images, videos, and code) on servers located closer to end users, reducing the physical distance data needs to travel and minimizing latenc",
    image:
      "https://i.pinimg.com/1200x/ff/a6/ac/ffa6ac1cf9a00c1bbcdcce3699158f41.jpg",
    link: "https://chatgpt.com/hju378494i48493n",
    likes: 3,
    views: 10,
  },
  {
    id: 2,
    date: "12/03/25",
    category: "religion",
    title: "Escaping tutorial Hell",
    subtitle: "make the best out of everything you can",
    description:
      "CDN stands for Content Delivery Network or Content Distribution Network, which is a network of geographically distributed servers that work together to deliver web content faster. CDNs improve website performance by caching copies of a website's files (like images, videos, and code) on servers located closer to end users, reducing the physical distance data needs to travel and minimizing latenc",
    image:
      "https://blogs.fuqua.duke.edu/duke-mba/wp-content/uploads/sites/2/2019/11/25-random-things-blog.jpg",
    link: "https://chatgpt.com/hju378494i48493n",
    likes: 5,
    views: 15,
  },
  {
    id: 3,
    date: "12/03/25",
    title: "Escaping man Hell",
    category: "personal development",
    subtitle: "make the best out of everything you can",
    description:
      "CDN stands for Content Delivery Network or Content Distribution Network, which is a network of geographically distributed servers that work together to deliver web content faster. CDNs improve website performance by caching copies of a website's files (like images, videos, and code) on servers located closer to end users, reducing the physical distance data needs to travel and minimizing latenc",
    image:
      "https://i.pinimg.com/736x/d7/e0/a9/d7e0a982c4d82f1d8e7bceb16fa7cd76.jpg",
    link: "https://chatgpt.com/hju378494i48493n",
    likes: 2,
    views: 8,
  },
];
const comments = [
  {
    blogID: 1,
    id: 1,
    date: "12/03/25",
    comment: "this a great comment all of you should read this thing",
    author: "Daniel Swarez",
    likes: 0,
  },
  {
    blogID: 1,
    id: 1,
    date: "12/03/25",
    comment: "this a great comment all of you should read this thing",
    author: "Daniel Swarez",
    likes: 0,
  },
  {
    blogID: 1,
    id: 1,
    date: "12/03/25",
    comment: "this a great comment all of you should read this thing",
    author: "Daniel Swarez",
    likes: 0,
  },
  {
    blogID: 1,
    id: 1,
    date: "12/03/25",
    comment: "this a great comment all of you should read this thing",
    author: "Daniel Swarez",
    likes: 0,
  },
  {
    blogID: 1,
    id: 2,
    date: "12/03/25",
    comment:
      "this a great comment all of yoi should read this thing again and again",
    author: "Daniel Muchero",
    likes: 2,
  },
  {
    blogID: 2,
    id: 3,
    date: "12/04/25",
    comment: "I do think its great but you can do a little better",
    author: "Mark Zukerbeurg",
    likes: 1,
  },
];

const admin = {
  id: "12ghsi3ued4",
  name: "Prayer Mawere",
  role: "Tech enthusiast",
  bio: "a passionate tech enthusiast with a deep curiosity for howtechnology shapes the world around us. From exploring the latestinnovations in AI and software development to experimenting with newtools and frameworks, I love turning ideas into functional, creativesolutions.",
  story:
    "a passionate tech enthusiast with a deep curiosity for howtechnology shapes the world around us. From exploring the latestinnovations in AI and software development to experimenting with newtools and frameworks, I love turning ideas into functional, creativesolutions.",
  skills: ["HTML", "CSS", "javascript", "Nodejs", "Express", "TailwindCSS"],
  image: "https://anesumawere-portfolio.space/me.png",
  unique_code1: "g4r;f.,ogp,uf8973478fhd",
  unique_code2: "g4r;f.,ogp,uf8973478fhd",
};
const publicAdmin = {
  name: "Prayer Mawere",
  role: "Tech enthusiast",
  bio: "Tech Enthusiast | Turning ideas into reality | Web Developer I’m a passionate tech enthusiast with a deep curiosity for how technology shapes the world around us. From exploring the latest innovations in AI and software development to experimenting with new tools and frameworks, I love turning ideas into functional, creative solutions.",
  story:
    "a passionate tech enthusiast with a deep curiosity for howtechnology shapes the world around us. From exploring the latestinnovations in AI and software development to experimenting with newtools and frameworks, I love turning ideas into functional, creativesolutions.",
  skills: ["HTML", "CSS", "javascript", "Nodejs", "Express", "TailwindCSS"],
  image: "https://anesumawere-portfolio.space/me.png",
  category: "about me",
};
const testimonials = [
  {
    id: 1,
    username: "Adrien Marie",
    image: "https://thispersondoesnotexist.com/",
    testimony:
      "this is where whatever i think of prayer mawere comes to play this might just be a lie but that doesent matter",
    date: "07/09/25",
    category: "testimonial",
  },
  {
    id: 2,
    username: "Adrien Marie",
    image:
      "https://media.istockphoto.com/id/2194296851/photo/an-african-american-woman-with-a-contagious-smile-interacts-with-her-smartphone.webp?a=1&b=1&s=612x612&w=0&k=20&c=MJeMOdZaDnNwu8FhKJp_qjlHsuzh4qbWVcmNETJ9ZhY=",
    testimony:
      "this is where whatever i think of prayer mawere comes to play this might just be a lie but that doesent matter",
    date: "07/09/25",
    category: "testimonial",
  },
  {
    id: 3,
    username: "Adrien Marie",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
    testimony:
      "this is where whatever i think of prayer mawere comes to play this might just be a lie but that doesent matter",
    date: "07/09/25",
    category: "testimonial",
  },
  {
    id: 4,
    username: "Adrien Marie",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    testimony:
      "this is where whatever i think of prayer mawere comes to play this might just be a lie but that doesent matter",
    date: "07/09/25",
    category: "testimonial",
  },
];

secretCodes = [
  generateSecretCode(),
  generateSecretCode(),
  generateSecretCode(),
  generateSecretCode(),
];

module.exports = {
  blogs,
  admin,
  comments,
  testimonials,
  secretCodes,
  projects,
  publicAdmin,
};
