# 🩸 BloodAid Client - Blood Donation Platform (React)

## 🚀 Live Site

- **Frontend:** [https://blood-aid-now.web.app/](https://blood-aid-now.web.app/)
- **API:** [http://localhost:5000//](http://localhost:5000//)

---

## 🌟 Project Overview ...

**BloodAid** is a modern, full-stack blood donation platform built with React, Tailwind CSS, Firebase Auth, Stripe, and a Node.js/Express/MongoDB backend.  
It enables users to request and donate blood, manage their profiles, fund the organization, and access a rich dashboard experience based on their role (admin, volunteer, donor).

---

## 🖼️ Key Features

- **Role-based Dashboard:**  
  - Admin, Volunteer, Donor—each with their own dashboard, sidebar, and features
- **Blood Donation Requests:**  
  - Create, view, edit, delete, and respond to blood requests
  - Public search for donors by blood group, district, upazila
- **Funding (Stripe):**  
  - Anyone can donate funds via Stripe
  - Admin/volunteer can view all funding, total funding stats
- **Blog System:**  
  - Add, manage, and view blogs (admin/volunteer)
  - Public blog page with details and category filter
- **Contact/FAQ:**  
  - Contact form with subject, message, and login check
  - FAQ/Accordion section on home page
- **Authentication & Security:**  
  - Firebase Auth (email/password, Google)
  - JWT-protected private routes
  - Block/unblock user, role management (admin only)
- **Modern UI:**  
  - Responsive, rounded, clean, and trustful BloodAid theme
  - Framer Motion animations, Lottie icons, and more

---

## 🗂️ File Structure (Key Folders)
<pre> ```bash
├── src
│   ├── assets
│   │   ├── react.svg
│   │   ├── hfdjfd.png
│   │   ├── animations
│   │   │   ├── cooking.json
│   │   │   ├── happy.json
│   │   │   ├── loading.json
│   │   │   ├── loginAnimation.json
│   │   │   ├── sad.json
│   │   │   └── lottie
│   │   │       ├── Fallingheart.json
│   │   │       ├── blood-pressure.json
│   │   │       ├── blood-donor.json
│   │   │       └── heart-beat.json
│   │   └── images (if you keep necessary graphics only)
│
│   ├── Routers
│   │   ├── PrivateRoute.jsx
│   │   └── mainRoutes.jsx
│
│   ├── components
│   │   ├── Banner.jsx
│   │   ├── FoodCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Social.jsx
│   │   ├── SponsorBloodAid.jsx
│   │   ├── StripeWrapper.jsx
│   │   ├── Title.jsx
│   │   ├── funding
│   │   │   ├── FundingForm.jsx
│   │   │   ├── FundingStatCard.jsx
│   │   │   └── FundingTable.jsx
│   │   ├── home
│   │   │   ├── BloodRequestCard.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── FAQAccordion.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   └── TopNotice.jsx
│   │   ├── loading
│   │   │   ├── DashboardLoading.jsx
│   │   │   └── SidebarLoading.jsx
│   │   └── ui
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── PhotoGallery.jsx
│   │       ├── ScrollToTop.jsx
│   │       ├── ShinyButton.jsx
│   │       └── ToggleLightDark.jsx
│
│   ├── data
│   │   ├── bd-districts.json
│   │   └── bd-upazilas.json
│
│   ├── firebase
│   │   └── firebase.config.js
│
│   ├── hooks
│   │   ├── axiosPublic.js
│   │   ├── useAxiosSecure.js
│   │   ├── useCountUp.jsx
│   │   ├── useDashboardStars.jsx
│   │   ├── useDistrictUpazila.js
│   │   └── useRole.jsx
│
│   ├── layouts
│   │   ├── DashboardLayout.jsx
│   │   └── RootLayout.jsx
│
│   ├── pages
│   │   ├── _dashboard
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── DonationRequestsPublic.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── ProfileDashboard.jsx
│   │   │   ├── UserDetailsDashboard.jsx
│   │   │   ├── VolunteerDashboard.jsx
│   │   │   ├── admin
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── DashboardSidebarAdmin.jsx
│   │   │   │   ├── blogs
│   │   │   │   │   ├── AddBlogAdmin.jsx
│   │   │   │   │   ├── EditBlogAdmin.jsx
│   │   │   │   │   ├── ManageBlogs.jsx
│   │   │   │   │   └── ViewBlogAdmin.jsx
│   │   │   │   ├── funding
│   │   │   │   │   ├── AllFundingAdmin.jsx
│   │   │   │   │   └── ViewFundingAdmin.jsx
│   │   │   │   ├── requests
│   │   │   │   │   ├── AllRequestsAdmin.jsx
│   │   │   │   │   ├── EditRequestAdmin.jsx
│   │   │   │   │   ├── ManageDonationsAdmin.jsx
│   │   │   │   │   └── ViewRequestAdmin.jsx
│   │   │   │   └── users
│   │   │   │       └── ManageUserAdmin.jsx
│   │   │   ├── donor
│   │   │   │   ├── DashboardSidebarDonor.jsx
│   │   │   │   ├── HomeDonor.jsx
│   │   │   │   └── requests
│   │   │   │       ├── CreateDonationRequestDonor.jsx
│   │   │   │       ├── EditRequestDonor.jsx
│   │   │   │       └── ViewRequestDonor.jsx
│   │   │   ├── shared
│   │   │   │   ├── AddBlogs.jsx
│   │   │   │   ├── contacts
│   │   │   │   │   └── ViewContactsDashboard.jsx
│   │   │   │   ├── funding
│   │   │   │   │   ├── FundingForm.jsx
│   │   │   │   │   ├── FundingStatCard.jsx
│   │   │   │   │   ├── FundingTable.jsx
│   │   │   │   │   └── MyFundingTable.jsx
│   │   │   │   ├── requests
│   │   │   │   │   ├── CreateDonationRequestDashboard.jsx
│   │   │   │   │   ├── MyDonationRequestsDashboard.jsx
│   │   │   │   │   ├── MyDonationRequestsDetails.jsx
│   │   │   │   │   └── MyDonationRequestsDetailsEdit.jsx
│   │   │   │   └── users
│   │   │   │       ├── ManageUsers.jsx
│   │   │   │       └── UserModal.jsx
│   │   │   └── volunteer
│   │   │       ├── DashboardSidebarVolunteer.jsx
│   │   │       ├── HomeVolunteer.jsx
│   │   │       ├── blogs
│   │   │       │   ├── AddBlogVolunteer.jsx
│   │   │       │   ├── EditBlogVolunteer.jsx
│   │   │       │   └── ManageBlogsVolunteer.jsx
│   │   │       ├── funding
│   │   │       │   ├── AllFundingVolunteer.jsx
│   │   │       │   └── ViewFundingVolunteer.jsx
│   │   │       └── requests
│   │   │           ├── AllRequestsVolunteer.jsx
│   │   │           ├── EditRequestVolunteer.jsx
│   │   │           └── ViewRequestVolunteer.jsx
│   │   └── _fronted
│   │       ├── about
│   │       │   └── About.jsx
│   │       ├── auth
│   │       │   ├── Error.jsx
│   │       │   ├── Login.jsx
│   │       │   └── Register.jsx
│   │       ├── blog
│   │       │   ├── Blog.jsx
│   │       │   ├── BlogCard.jsx
│   │       │   ├── BlogCategoryFilter.jsx
│   │       │   ├── BlogDetails.jsx
│   │       │   └── BlogList.jsx
│   │       ├── contact
│   │       │   └── Contact.jsx
│   │       ├── funding
│   │       │   └── FundingPage.jsx
│   │       ├── home
│   │       │   ├── CTASection.jsx
│   │       │   ├── ContactSection.jsx
│   │       │   ├── DetailsPage.jsx
│   │       │   ├── Error.jsx
│   │       │   ├── FeaturesSection.jsx
│   │       │   ├── HeroSection.jsx
│   │       │   ├── Home.jsx
│   │       │   ├── Loading.jsx
│   │       │   ├── TestimonialsSection.jsx
│   │       ├── search
│   │       │   ├── Search.jsx
│   │       │   └── Search4.jsx
│   │       └── shared
│   │           ├── Banner.jsx
│   │           ├── Footer.jsx
│   │           ├── Navbar.jsx
│   │           └── Social.jsx
│
│   ├── providers
│   │   └── AuthProvider.jsx
│
│   ├── utils
│   │   └── bdLocationData.json
│
│   ├── index.css
│   └── main.jsx
```</pre> 
---

## 🔑 How to Use

- **Home, Blog, Funding, Contact:**  
  - Publicly accessible, no login required
- **Dashboard:**  
  - Login required (role-based access)
  - Admin/volunteer/donor see different features
- **Funding:**  
  - Anyone can donate from the public funding page
  - Dashboard shows personal funding history (My Funding)
- **Contact:**  
  - Only logged-in users can send messages (Swal alert if not logged in)

---

## 📝 Main Pages & Components

- `/` - Home (Banner, Features, FAQ, Contact, Blog preview)
- `/blog` - Public blog list and details
- `/funding` - Public funding page (Stripe payment + funding table)
- `/contact` - Contact form (subject, message, login check)
- `/search` - Donor search (option-based & dynamic)
- `/dashboard` - Role-based dashboard (admin, volunteer, donor)
- `/dashboard/contacts` - Admin/volunteer contact message view (grid)
- `/dashboard/funding` - All funding (admin/volunteer), My funding (donor)
- `/dashboard/my-donation-requests` - My blood requests (donor)
- `/dashboard/all-blood-donation-request` - All requests (admin/volunteer)
- `/dashboard/profile` - Profile view/edit

---

## 🔐 Authentication

- Firebase Auth (email/password, Google)
- JWT token for private API calls
- Role-based access (admin, volunteer, donor)
- Block/unblock user, role change (admin only)

---

## 💡 Technologies Used

- React, Vite, Tailwind CSS, DaisyUI, Framer Motion, Lottie
- Firebase Auth
- Stripe (payment)
- Axios, React Query
- Node.js, Express, MongoDB (backend)

---

## 🛠️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/blood-aid-client.git

# Navigate to project directory
cd blood-aid-client

# Install dependencies
npm install

# Create .env file and add your Firebase/Stripe config

# Start the development server
npm run dev
📢 Need Help?
For any feature, bug, or extension,
just ask your AI assistant with this README as context!
Example:
"How to add a new blog post page?"
"How to show only active donors in search?"
"How to add a new stat card to the dashboard?"
This README contains all the context, structure, and feature details needed for any AI model or developer to continue, extend, or debug the project without further explanation.

Live Site: https://blood-aid-now.web.app/
API: http://localhost:5000//


