# Ubuntu下使用Composer安装Laravel
Composer是处理PHP包依赖关系的一个工具。

Laravel作为一个标准的Composer包发布，我们可以使用Composer来快速的安装Laravel应用。

Lravavel作为一个框架，和Go语言里的Beego框架是类似的。
安装好的Laravel可以提供一个全局的laravel命令，类似于Beego框架的bee工具。

## 配置信息
使用`composer config -l -g`可以查看composer的全局配置文件
```
[repositories.packagist.org.type] composer
[repositories.packagist.org.url] https://packagist.phpcomposer.com
[process-timeout] 300
[use-include-path] false
[preferred-install] auto
[notify-on-install] true
[github-protocols] [https, ssh]
[vendor-dir] vendor (/home/lich/vendor)
[bin-dir] {$vendor-dir}/bin (/home/lich/vendor/bin)
[cache-dir] /home/lich/.cache/composer
[data-dir] /home/lich/.local/share/composer
[cache-files-dir] {$cache-dir}/files (/home/lich/.cache/composer/files)
[cache-repo-dir] {$cache-dir}/repo (/home/lich/.cache/composer/repo)
[cache-vcs-dir] {$cache-dir}/vcs (/home/lich/.cache/composer/vcs)
[cache-ttl] 15552000
[cache-files-ttl] 15552000
[cache-files-maxsize] 300MiB (314572800)
[bin-compat] auto
[discard-changes] false
[autoloader-suffix]
[sort-packages] false
[optimize-autoloader] false
[classmap-authoritative] false
[apcu-autoloader] false
[prepend-autoloader] true
[github-domains] [github.com]
[bitbucket-expose-hostname] true
[disable-tls] false
[secure-http] true
[cafile]
[capath]
[github-expose-hostname] true
[gitlab-domains] [gitlab.com]
[store-auths] prompt
[archive-format] tar
[archive-dir] .
[home] /home/lich/.config/composer
```
在最后我们可以看到有[home]项目，这个是composer的家目录，我们后面执行全局安装laravel的命令就会安装在这个目录下的vendor文件中。

## 设置全局中文软件源
按照(https://pkg.phpcomposer.com/) 的说明进行设置，其中第一个修改composer全局变量的方式，就是修改/home/xxx/.config/composer文件夹中的config.json文件中的内容(以下就是修改过的内容)
```
{
    "config": {},
    "repositories": {
        "packagist": {
            "type": "composer",
            "url": "https://packagist.phpcomposer.com"
        }
    }
}
```

## 全局安装laravel
按照() 的说明进行安装，安装好之后会在/home/xxx/.config/composer/vendor建立一个标准的composer包（我的猜测，该说法没有证据佐证）。
其中bin/目录下有一个指向可执行php脚本laravel的一个链接，这个脚本就是我们以后在命令行中可以使用的laravel命令。

安装完之后记得修改环境变量，将/home/xxx/.config/composer/vendor/bin/目录加入$PATH，就可以在任意位置执行laravel命令了。
