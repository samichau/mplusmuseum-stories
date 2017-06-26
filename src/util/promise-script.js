export default function addScript(src) {
  return new Promise((resolve, reject) => {
    let resolved = false;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;

    function done() {
      if (!resolved && (!this.readyState || this.readyState === 'complete')) {
        resolved = true;
        resolve(this);
      }
    }

    s.onload = done;
    s.onreadystatechange = done;

    s.onerror = reject;
    s.onabort = reject;

    document.body.appendChild(s);
  });
}
