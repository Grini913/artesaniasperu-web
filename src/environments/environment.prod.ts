// Producción: Nginx de la VM de Presentación debe hacer proxy de /api hacia WildFly
// (location /api/ { proxy_pass http://20.97.241.69:8080/artesanias-test/api/; }).
export const environment = {
  production: true,
  apiUrl: '/api',
};
