import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTranslateVisible, setIsTranslateVisible] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleAffiliateRedirect = () => {
    navigate('/affiliate');
  };

  const toggleGoogleTranslate = () => {
    if (!isTranslateVisible) {
      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element';
      translateDiv.style.position = 'fixed';
      translateDiv.style.top = '0';
      translateDiv.style.left = '50%';
      translateDiv.style.transform = 'translateX(-50%)';
      translateDiv.style.zIndex = '1000';
      document.body.insertBefore(translateDiv, document.body.firstChild);

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      window.googleTranslateElementInit = function() {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'es,pt',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          'google_translate_element'
        );
      };
    } else {
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.remove();
      }
      const gwitterIframe = document.querySelector('.goog-te-menu-frame');
      if (gwitterIframe) {
        gwitterIframe.remove();
      }
      document.querySelectorAll('script').forEach(script => {
        if (script.src.includes('translate_a/element.js')) {
          script.remove();
        }
      });
    }
    setIsTranslateVisible(!isTranslateVisible);
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Turbo
        </span>
        Reels
      </Link>
      
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Button
          className="lg:inline hidden bg-gradient-to-r from-blue-500 to-green-500 text-white"
          onClick={handleAffiliateRedirect}
        >
          Affiliate Program
        </Button>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
  <Navbar.Link active={path === (currentUser ? '/' : '/about')} as={'div'}>
    {currentUser ? (
      <Link to="/">Home</Link>
    ) : (
      <Link to="/about">Home</Link>
    )}
  </Navbar.Link>
</Navbar.Collapse>
    </Navbar>
  );
}