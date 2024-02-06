/**
 * @license
 * Copyright (c) 2020 ServiceNow, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
const n=require("path");const e=require("fs");const o=n.join(__dirname,".builderrc");e.existsSync(o)||console.warn("[@servicenow/cli-archetype-dev] a .builderrc file could not be resolved. No point in preparing it. Peace out.");const i=[];const s=e.readFileSync(o,"utf8");s.split("\n").slice(2).forEach(n=>{const e=n.indexOf("@");const o=n.length-(e+1);i.push(n.substr(e,o).trim())});const ensureDir=o=>{const i=o.split(n.sep);let s="/";i.forEach(o=>{s=n.join(s,o),e.existsSync(s)||e.mkdirSync(s)})};const getMainMonoRepoPath=o=>!!o&&(e.existsSync(n.join(o,"lerna.json"))?o:getMainMonoRepoPath(n.dirname(o)));const r=getMainMonoRepoPath(__dirname);r||console.warn("[@servicenow/cli-archetype-dev] a mono repository root could not be resolved. If this package is not part of a mono repository then who cares?");const isSymlink=n=>{try{return e.lstatSync(n).isSymbolicLink()}catch(n){return!1}};const createSymlink=(o,i)=>{isSymlink(i)||e.existsSync(i)||(ensureDir(n.dirname(i)),e.symlinkSync(o,i,"dir"))};const t=n.join(__dirname,"node_modules","builder");const c=n.join(__dirname,"node_modules",".bin","builder");createSymlink(n.join(r,"node_modules",".bin","builder"),c),createSymlink(n.join(r,"node_modules","builder"),t),i.forEach(e=>{if(e){const o=n.join(__dirname,"node_modules",e);const i=n.join(__dirname,"node_modules",`${e}-dev`);createSymlink(n.join(r,"node_modules",e),o),createSymlink(n.join(r,"node_modules",`${e}-dev`),i)}});