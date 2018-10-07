<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        Message [{{message}}]
      </h1>
      <div>{{connected}}</div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },

  data () {
    return {
      connected: false,
      message: 'ok',
    };
  },

  mounted () {
    const url = 'ws://localhost:8080';
    this.ws = new WebSocket(url);

    this.ws.addEventListener('open', () => {
      console.log('connection established!');
    });

    this.ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;
      console.log('message came!', message);

      this.message = message;
    });
  },

  destroyed () {
    this.ws.close();
  },
};
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
