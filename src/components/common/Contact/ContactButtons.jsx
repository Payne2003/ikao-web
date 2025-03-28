import youtube from '@/assets/image/icons8-youtube-96.png';
import zalo from '@/assets/image/icons8-zalo-96.png';
import phone from '@/assets/image/phone.png';
import tiktok from '@/assets/image/icons8-tiktok-96.png';
import fb from '@/assets/image/icons8-fb-96.png';
import shoppe from '@/assets/image/shoppe.png';
import '@/components/common/Contact/globals.css'

const ContactButtons = () => {
  const contacts = [
    { icon: phone, alt: "phone", link: "#", glowClass: "glow-green" },
    { icon: zalo, alt: "zalo", link: "#", glowClass: "glow-blue" },
    { icon: fb, alt: "facebook", link: "#", glowClass: "glow-blue" },
    { icon: tiktok, alt: "tiktok", link: "#", glowClass: "glow-purple" },
    { icon: youtube, alt: "youtube", link: "#", glowClass: "glow-red" },
    { icon: shoppe, alt: "shoppe", link: "#", glowClass: "glow-orange" }
  ];

  return (
    <div className="fixed right-10 hidden sm:flex bottom-10 z-2 flex-col gap-4">
      {contacts.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative w-28 h-28 flex items-center justify-center bg-white rounded-full shadow-xl 
                     transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl
                     ${contact.glowClass}`}
        >
          <img src={contact.icon}  alt={contact.alt} width={50}
              height={50} className=" rounded-full" />
        </a>
      ))}
    </div>
  );
};

export default ContactButtons;
