function main() {
  const a = document.createElement('a');
  a.append('Generate');
  //a.href = 'https://modern-bard.uk.r.appspot.com/';
  a.href = 'http://localhost:8013/';
  a.classList.add('midi-link');

  document.body.append(a);
}

main();
