# nginx-bandwidth-throttling
Since nginx permits only to limit the http band per request or per number of requests/ip, the aim of this module is to enable nginx to shape the band by considering two parameters, which are the ip address, the (k)B/s value and, if it is available, the user id. Our solution relies on a personalization of the [Nginx-limit-traffic-rate-module](https://github.com/bigplum/Nginx-limit-traffic-rate-module), which permits to limit the rate of download requests.

## Architecture
![alt text](arch.png?raw=true)

## Confluence
All the details about the module are available in [Confluence](https://jiratech.skycdn.it/confluence/pages/viewpage.action?pageId=7145868).

## Getting Started

Follow these instructions in order to build the module on your local machine. The following steps are applied within the bash script named `MODULE_INSTALL.sh`. Please note that you should change properly the folder paths specified in the script before running it.

### Prerequisites

* the `gcc` compiler ^(4 or higher).

### Installing

1. Be sure that nginx is not already available on your machine, since you are installing a brand new instance.

2. Download `nginx` ^(1.12.2 or higher) from the [nginx website](http://nginx.org/en/download.html) and uncompress the archive.  We consider the version 1.12.2 as target, since we tested the module on this build.

3. Move to the uncompressed archive.
    ```
    cd nginx-1.12.2/
    ```

4. Configure `nginx` by adding the modules provided in this git repository within the `modules` folder. 
    ```
    ./configure 
        --add-module=..path/to/modules/lua-nginx-module-0.10.12rc2             
        --add-module=..path/to/modules/Nginx-limit-traffic-rate-module.master
        --add-module=..path/to/modules/ngx_devel_kit-0.3.1rc1
        --prefix=/opt/nginx 
        --with-debug
    ```
    This command will install `nginx` at the path `/opt/nginx`. If you want to change your installation path, you should change the `--prefix` value. You should set `..path/to/modules/` properly by specifying where the modules are. 
    * Please note that `Lua/LuaJIT` is required in order to build the module properly. If your machine does not have it installed, you should install LuaJIT 2.0 or 2.1 (recommended) or Lua 5.1 (Lua 5.2 is *not* supported yet). LuaJIT can be downloaded from the [LuaJIT project website](http://luajit.org/download.html) and Lua 5.1, from the [Lua project website](http://www.lua.org/). Some distribution package managers also distribute LuaJIT and/or Lua.
    * The `--with-debug` option causes `nginx` to generate a very huge amount of records within the error log. You should use it only in test environments.

5. Compile and install `nginx` by using this command.
    ```
    make && make install
    ```
    The `nginx` instance should be available at `/opt/nginx`.
    
6. Overwrite the `nginx.conf` configuration file by copying the one provided in this git repository.
    ```
    cp nginx.conf /opt/nginx/conf/
        > overwrite? Y
    ```

7. Define a new folder named `addresses` in `/opt/nginx/conf`.
    ```
    mkdir /opt/nginx/conf/addresses
    ```
8. Now you can start the `nginx` server instance.
    ```
    /opt/nginx/sbin/nginx
    /opt/nginx/sbin/nginx -s reload
    ```
## Issues
If the issue "crit 31495#0: *7363 open() failed (24: Too many open files) while reading upstream" is listed within the error.log, you should follow the steps grouped in this [guide](https://gist.github.com/joewiz/4c39c9d061cf608cb62b). In our machine, we set 500000 as `fs.file-max` value.

## Authors

* **Matteo Zardoni** - [ma.zardoni@reply.it](mailto:ma.zardoni@reply.it)

