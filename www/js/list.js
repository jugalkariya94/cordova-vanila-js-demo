/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var list = [];

function onDeviceReady() {
    debugger;
    // Cordova is now initialized. Have fun!

    // document.getElementById('deviceready').classList.add('ready');
    window.open = cordova.InAppBrowser.open ;

    document.getElementById('search').addEventListener('input', buildList)

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then((data ) => {
            list = _.map(data, _.property('title'));
            buildList();
        });


}

function buildList()
{
    let searchWord =  document.getElementById('search').value.toLowerCase();
    let searchResults = list.filter((str) => { return str.includes(searchWord); });
    let listElement = document.getElementById('list');
    listElement.innerHTML = '';
    searchResults.forEach((searchResult) => {
        listElement.innerHTML += '<li>'+ searchResult +'</li>';
    })
}
