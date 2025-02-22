# **Job Portal** 🏢💼  

## **Overview**  
Job Portal is a **MERN stack** web application that connects **job seekers** with **employers**. It allows recruiters to **post jobs**, manage applications, and review applicants, while job seekers can **apply for jobs** and track their application status.  

## **Key Features** 🚀  
✅ **User Authentication**: Secure login and registration using JWT & cookies.  
✅ **Company Management**: Employers can register and manage their companies.  
✅ **Job Posting**: Employers can create and manage job listings.  
✅ **Job Applications**: Users can apply for jobs, and recruiters can manage applicants.  
✅ **Application Tracking**: Users can view their applied jobs & application status.  
✅ **Cloudinary Integration**: Profile pictures, company logos and applicants resume are uploaded to Cloudinary.  
✅ **Admin Panel**: Employers can manage company, jobs & applicants.  
✅ **Radix UI Theme**: UI components built with **Radix UI** for accessibility & styling.  

## **Tech Stack** 🛠️  
- **Frontend**: React.js, Tailwind CSS, Radix UI  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT, Cookies  
- **File Uploads**: Multer & Cloudinary  
- **Deployment**: **Backend on Render, Frontend on Vercel**  

## **Live Demo** 🌍  
- **Frontend**: [Job Portal Frontend](https://job-portal-three-plum.vercel.app/)  
- **Backend**: [Job Portal Backend](https://job-portal-7i8l.onrender.com)  

## **Installation & Setup** 🏗️  
### **1. Clone the Repository**  
```sh
git clone https://github.com/officialjaykishan0001/job-portal.git  
cd job-portal  
```

### **2. Install Dependencies**  
```sh
# Install backend dependencies  
cd backend  
npm install  

# Install frontend dependencies  
cd ../frontend  
npm install  
```

### **3. Configure Environment Variables**  
Create a `.env` file in the **backend** directory and add:  
```env
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
SECRET_KEY=your_jwt_secret  
CLOUD_NAME=your_cloudinary_cloud_name 
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
```

### **4. Run the Application**  
```sh
# Start backend server  
cd backend  
npm run dev  

# Start frontend  
cd ../frontend  
npm start  
```

## **API Documentation** 📜  
Detailed API documentation is available in the `/backend/README.md/` directory, covering authentication, job postings, applications, and company management.

## **Contributing** 🤝  
Feel free to fork this repository and create pull requests for new features or bug fixes.
