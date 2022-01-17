export const el = (() => {
    const div = document.createElement('div');
    return (html, content) => {
        div.innerHTML = html.trim();
        content && (div.firstChild.textContent = content);
        return div.firstChild;
    }
})();

export const txt = text => document.createTextNode(text);

export const append = (parent, ...el) => {
    el.forEach(node => parent.appendChild(node));
    return parent;
}

export const timed_class = (element, class_name, time = 1000) => {
    element.classList.add(class_name);
    setTimeout(() => {
        element.classList.remove(class_name);
    }, time);
}