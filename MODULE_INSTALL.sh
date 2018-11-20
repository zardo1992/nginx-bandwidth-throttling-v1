echo "Stopping nginx server..."
/opt/nginx/sbin/nginx -s stop
echo "Removing previous stored files..."
sudo rm -rf /opt/nginx
cd /home/matteo/nginx-bandwidth-throttling___first_version/nginx-1.12.2/
echo "Nginx-limit-traffic-rate-module POC MASTER will be installed"
./configure --add-module=/home/matteo/nginx-bandwidth-throttling___first_version/nginx-bandwidth-throttling/modules/lua-nginx-module-0.10.12rc2 --add-module=/home/matteo/nginx-bandwidth-throttling___first_version/nginx-bandwidth-throttling/modules/Nginx-limit-traffic-rate-module.master --add-module=/home/matteo/nginx-bandwidth-throttling___first_version/nginx-bandwidth-throttling/modules/ngx_devel_kit-0.3.1rc1  --prefix=/opt/nginx
make && make install
echo "Copying HTML source files..."
cd /home/matteo/nginx-bandwidth-throttling___first_version/nginx-bandwidth-throttling
cp -r html /opt/nginx
echo "Copying nginx.conf configuration file..."
cp /home/matteo/nginx-bandwidth-throttling___first_version/nginx-bandwidth-throttling/nginx.conf /opt/nginx/conf
mkdir /opt/nginx/conf/addresses
echo "Restarting server..."
/opt/nginx/pdl/sbin/nginx
/opt/nginx/pdl/sbin/nginx -s reload
echo "Finish!"
/opt/nginx/pdl/sbin/nginx -V
