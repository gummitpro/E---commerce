import React, { useEffect, useState } from 'react'
import '../ScrollToTop/style.css'
function Index() {
	const [isVisible, setIsVisible] = useState(false);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
  	};

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
	return (
		<div className="wrap-scroll-top" style={{opacity: isVisible ? "1" : "0" }} onClick={scrollToTop}>
			<i className="fas fa-chevron-up"></i>
		</div>
	)
}

export default Index
