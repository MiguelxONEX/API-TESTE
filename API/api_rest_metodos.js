// Import fetch no Node.js (se for navegador, pode ignorar esta linha)
import fetch from 'node-fetch'; // só para Node.js, com npm install node-fetch

// ===== CONFIGURAÇÃO DA MARVEL API =====
const ts = "1";
const publicKey = "SUA_PUBLIC_KEY";      // substitua aqui com sua public key da Marvel
const privateKey = "SUA_PRIVATE_KEY";    // substitua aqui com sua private key da Marvel
import md5 from 'blueimp-md5';            // no Node.js, instale com npm install blueimp-md5
const hash = md5(ts + privateKey + publicKey);

// ===== FUNÇÃO PRINCIPAL =====
async function executarAPIs() {
  try {
    // 1️⃣ GET na Marvel API (listar personagens)
    console.log("=== GET - Personagens Marvel ===");
    const marvelUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=5`;
    const resMarvel = await fetch(marvelUrl);
    const dataMarvel = await resMarvel.json();
    dataMarvel.data.results.forEach(char => console.log(char.name));

    // 2️⃣ POST na JSONPlaceholder (criar post)
    console.log("\n=== POST - Criando Post ===");
    const resPost = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Meu Post',
        body: 'Conteúdo do post',
        userId: 1
      })
    });
    const dataPost = await resPost.json();
    console.log(dataPost);

    // 3️⃣ PUT na JSONPlaceholder (atualizar post criado)
    console.log("\n=== PUT - Atualizando Post ===");
    const resPut = await fetch(`https://jsonplaceholder.typicode.com/posts/${dataPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: dataPost.id,
        title: 'Título Atualizado',
        body: 'Conteúdo atualizado',
        userId: 1
      })
    });
    const dataPut = await resPut.json();
    console.log(dataPut);

    // 4️⃣ DELETE na JSONPlaceholder (deletar post criado)
    console.log("\n=== DELETE - Deletando Post ===");
    await fetch(`https://jsonplaceholder.typicode.com/posts/${dataPost.id}`, {
      method: 'DELETE'
    });
    console.log("Post deletado com sucesso!");

  } catch (error) {
    console.error("Erro nas requisições:", error);
  }
}

executarAPIs();
