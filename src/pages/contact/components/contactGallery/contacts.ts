interface Contact {
    name: string,
    role: string,
    phone: string,
    email: string,
    imageURL: string,
}

const contacts: Contact[] = [
    {
        name: "Ishita Agrawal",
        role: "Registrations and Correspondence",
        phone: "+91 78040 51996",
        email: "pcr@bits-oasis.org",
        imageURL: "/images/contact/Ishita.png"
    },
    {
        name: "Rahul Gupta",
        role: "Website, App and Payments",
        phone: "+91 93510 13052",
        email: "webmaster@bits-oasis.org",
        imageURL: "/images/contact/Rahul.png"
    },
    {
        name: "Dhruv Maniar",
        role: "Sponsorships and Company Collaborations",
        phone: "+91 91675 32053",
        email: "dhruv@bits-oasis.org",
        imageURL: "/images/contact/Dhruv.png"
    },
    {
        name: "Ayushmaan Kumar",
        role: "Logistics and Operations",
        phone: "+91 91675 32053",
        email: "controls@bits-oasis.org",
        imageURL: "/images/contact/Ayushmaan.png"
    },
    {
        name: "Arshita Mittal",
        role: "Reception and Accommodation",
        phone: "+91 98777 07867",
        email: "recnacc@bits-oasis.org",
        imageURL: "/images/contact/Arshita.png"
    },
    {
        name: "Pranav Deshpande",
        role: "Online Collaborations and Publicity",
        phone: "+91 86575 33580",
        email: "adp@bits-oasis.org",
        imageURL: "/images/contact/Pranav.png"
    },
    {
        name: "Ahan Bansal",
        role: "President, Students' Union",
        phone: "+91 96875 13867",
        email: "president@pilani.bits-pilani.ac.in",
        imageURL: "/images/contact/Ahan.png"
    },
    {
        name: "Aryan Khorana",
        role: "General Secretary, Students' Union",
        phone: "+91 91493 38624",
        email: "gensec@pilani.bits-pilani.ac.in",
        imageURL: "/images/contact/Aryan.png"
    }
]

export default contacts;