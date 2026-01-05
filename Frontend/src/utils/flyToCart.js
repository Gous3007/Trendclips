export const flyToCart = (img) => {
    const cart = document.getElementById("cart-icon");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.top = imgRect.top + "px";
    clone.style.left = imgRect.left + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;
    clone.style.borderRadius = "12px";

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
        clone.style.top = cartRect.top + "px";
        clone.style.left = cartRect.left + "px";
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.3";
    });

    setTimeout(() => {
        clone.remove();
    }, 800);
};
