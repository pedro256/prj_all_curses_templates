import { Course } from '@/types';

export const allCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course will give you a solid foundation for building modern web applications.',
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: false,
    pdfUrl: 'https://www.w3.org/WAI/demos/bad/after/documents/Web_Accessibility_Intro.pdf',
    duration: '8 hours',
    lessons: 24,
    instructor: 'Alex Johnson',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deep into JavaScript with advanced concepts like closures, promises, async/await, and design patterns. Take your JS skills to the next level.',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: true,
    duration: '12 hours',
    lessons: 36,
    instructor: 'Sarah Miller',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Master the principles of user interface and user experience design. Learn to create beautiful, intuitive, and user-friendly digital products.',
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: false,
    pdfUrl: 'https://www.cs.uic.edu/~taipeics/UX-in-a-nutshell.pdf',
    duration: '10 hours',
    lessons: 28,
    instructor: 'David Wilson',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'React Native Masterclass',
    description: 'Build cross-platform mobile apps using React Native. This comprehensive course covers everything from setup to deployment.',
    imageUrl: 'https://images.pexels.com/photos/977296/pexels-photo-977296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: true,
    duration: '15 hours',
    lessons: 42,
    instructor: 'Emma Thompson',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Database Design & SQL',
    description: 'Learn how to design efficient databases and write powerful SQL queries. This course covers relational database concepts and practical SQL skills.',
    imageUrl: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: false,
    pdfUrl: 'https://www.guru99.com/pdf/database-design-all.pdf',
    duration: '9 hours',
    lessons: 26,
    instructor: 'Michael Brown',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Machine Learning Fundamentals',
    description: 'An introduction to machine learning concepts and algorithms. Learn how to build and train models for classification, regression, and clustering.',
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: true,
    duration: '20 hours',
    lessons: 48,
    instructor: 'Jessica Lee',
    level: 'Advanced'
  },
  {
    id: '7',
    title: 'Responsive Web Design',
    description: 'Master the art of creating websites that look great on any device. Learn about media queries, flexible grids, and responsive images.',
    imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: false,
    pdfUrl: 'https://www.academia.edu/32715755/Responsive_Web_Design_with_HTML5_and_CSS3_Second_Edition',
    duration: '7 hours',
    lessons: 20,
    instructor: 'Ryan Garcia',
    level: 'Beginner'
  },
  {
    id: '8',
    title: 'Cloud Computing with AWS',
    description: 'Learn to build, deploy, and manage applications on Amazon Web Services. Master services like EC2, S3, Lambda, and more.',
    imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    locked: true,
    duration: '14 hours',
    lessons: 38,
    instructor: 'Chris Taylor',
    level: 'Intermediate'
  }
];

export const featuredCourses: Course[] = allCourses.slice(0, 3);