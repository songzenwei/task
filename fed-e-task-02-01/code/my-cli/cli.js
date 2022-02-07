#!/usr/bin/env node

//Node CLI应用入口文件必须要有这样的文件头
//如果是Linux 或者 macOS 系统下还需要修改次文件的读写权限为755
// 具体就是通过 chmod 755 cli。js 实现修改

//脚手架工作过程：
//1.通过命令行交互询问用户问题
//2.根据用户回答的结果生成文件
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ejs = require("ejs");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project name",
    },
  ])
  .then((anwsers) => {
    console.log(anwsers);
    //根据用户回答的结果生成文件

    //模版目录
    const tmplDir = path.join(__dirname, "templates");
    //目标目录
    const destDir = process.cwd();
    //将模版文件下的文件全部转换到目标目录
    fs.readdir(tmplDir, (error, files) => {
      if (error) throw error;
      files.forEach((file) => {
        console.log(file);
        //通过模版引擎渲染文件
        ejs.renderFile(path.join(tmplDir, file), anwsers , (error,result)=>{
                if(error) throw error;

                //将结果写入目标文件路径
                fs.writeFileSync(path.join(destDir,file),result)

        });
      });
    });
  });