// Fly-to-cart animation utility
export const flyToCart = (productImageElement, cartIconElement, callback) => {
  if (!productImageElement || !cartIconElement) {
    if (callback) callback();
    return;
  }

  // Create a clone of the product image
  const flyingImage = productImageElement.cloneNode(true);
  const productRect = productImageElement.getBoundingClientRect();
  const cartRect = cartIconElement.getBoundingClientRect();

  // Calculate the path
  const deltaX =
    cartRect.left +
    cartRect.width / 2 -
    (productRect.left + productRect.width / 2);
  const deltaY =
    cartRect.top +
    cartRect.height / 2 -
    (productRect.top + productRect.height / 2);

  // Style the flying image
  flyingImage.style.position = "fixed";
  flyingImage.style.top = `${productRect.top}px`;
  flyingImage.style.left = `${productRect.left}px`;
  flyingImage.style.width = `${productRect.width}px`;
  flyingImage.style.height = `${productRect.height}px`;
  flyingImage.style.zIndex = "9999";
  flyingImage.style.pointerEvents = "none";
  flyingImage.style.transition =
    "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  flyingImage.style.borderRadius = "8px";
  flyingImage.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
  flyingImage.style.backgroundColor = "white";
  flyingImage.style.border = "2px solid #007bff";

  // Add to document
  document.body.appendChild(flyingImage);

  // Create floating effect with keyframes
  const keyframes = [
    {
      transform: "scale(1) rotate(0deg)",
      opacity: "1",
      top: `${productRect.top}px`,
      left: `${productRect.left}px`,
      width: `${productRect.width}px`,
      height: `${productRect.height}px`,
    },
    {
      transform: "scale(0.8) rotate(180deg)",
      opacity: "0.9",
      top: `${productRect.top + deltaY * 0.5}px`,
      left: `${productRect.left + deltaX * 0.5}px`,
      width: `${productRect.width * 0.8}px`,
      height: `${productRect.height * 0.8}px`,
    },
    {
      transform: "scale(0.3) rotate(360deg)",
      opacity: "0.7",
      top: `${cartRect.top + cartRect.height / 2 - 15}px`,
      left: `${cartRect.left + cartRect.width / 2 - 15}px`,
      width: "30px",
      height: "30px",
    },
    {
      transform: "scale(0) rotate(720deg)",
      opacity: "0",
      top: `${cartRect.top + cartRect.height / 2}px`,
      left: `${cartRect.left + cartRect.width / 2}px`,
      width: "0px",
      height: "0px",
    },
  ];

  // Trigger animation after a small delay
  setTimeout(() => {
    const animation = flyingImage.animate(keyframes, {
      duration: 800,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      fill: "forwards",
    });

    animation.onfinish = () => {
      // Remove the flying image
      if (document.body.contains(flyingImage)) {
        document.body.removeChild(flyingImage);
      }

      // Add cart bounce animation
      if (cartIconElement) {
        cartIconElement.style.transform = "scale(1.3)";
        cartIconElement.style.transition =
          "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

        setTimeout(() => {
          cartIconElement.style.transform = "scale(1)";
        }, 300);
      }

      // Execute callback
      if (callback) callback();
    };
  }, 50);

  // Fallback cleanup
  setTimeout(() => {
    if (document.body.contains(flyingImage)) {
      document.body.removeChild(flyingImage);
      if (callback) callback();
    }
  }, 1000);
};

// Show success message in cart icon
export const showCartSuccessIndicator = (cartIconElement) => {
  if (!cartIconElement) return;

  // Create success indicator
  const indicator = document.createElement("div");
  indicator.innerHTML = "+1";
  indicator.style.position = "absolute";
  indicator.style.top = "-10px";
  indicator.style.right = "-10px";
  indicator.style.backgroundColor = "#28a745";
  indicator.style.color = "white";
  indicator.style.borderRadius = "50%";
  indicator.style.width = "20px";
  indicator.style.height = "20px";
  indicator.style.display = "flex";
  indicator.style.alignItems = "center";
  indicator.style.justifyContent = "center";
  indicator.style.fontSize = "10px";
  indicator.style.fontWeight = "bold";
  indicator.style.zIndex = "10000";
  indicator.style.animation = "bounce 0.5s ease-in-out";

  // Add CSS animation
  if (!document.getElementById("cart-success-animation")) {
    const style = document.createElement("style");
    style.id = "cart-success-animation";
    style.textContent = `
      @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Add to cart icon parent
  const cartParent = cartIconElement.parentElement;
  if (cartParent) {
    cartParent.style.position = "relative";
    cartParent.appendChild(indicator);

    // Remove after animation
    setTimeout(() => {
      if (cartParent.contains(indicator)) {
        cartParent.removeChild(indicator);
      }
    }, 1500);
  }
};
