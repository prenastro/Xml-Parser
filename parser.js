<script language="JavaScript">

function generateHTML(xmlDoc)
   {      
   
           root=xmlDoc.DocumentElement;
	  
           html_text="<html><head><title>XML Parse Result</title></head><body>";
           html_text+="<table border='2' height='900' width='900'>";
		   
           header = xmlDoc.getElementsByTagName("Data");
			var headerNodeList = new Array();
			var rowNodeList = new Array();
			var hubList = new Array();
			rows = xmlDoc.getElementsByTagName("Row");
			
		 if(header.length == 0)
		 {
		 alert("Data is Empty");
		 err = 1;
		 return;
		 }  
		 else{
		   for(i=0;i<header.length;i++)
		   {
            headerNodeList[i]=header[i].childNodes[0].nodeValue;
		   }
           html_text+="<tr>";
	       
           for(i=0;i<headerNodeList.length;i++)
           {  
			html_text+="<th>"+headerNodeList[i]+"</th>";  
		   }
           html_text+="</tr>";		  
		 }
		  
		 if(rows.length == 0)
		 {
		 alert("Rows are Empty");
		 err = 1;
		 return;
		 }
		 else{
		  for(i=0;i<rows.length;i++)
		  {
		    html_text+="<tr>";
			
		  
		   for(j=0;j<header.length;j++)
		    {
			//var elem = rows[i].getElementsByTagName(headerNodeList[j])[0];
			var elem =  rows[i].getElementsByTagName("Airline")[0];
			var elem1 = rows[i].getElementsByTagName("IATA")[0];
			var elem2 = rows[i].getElementsByTagName("Hubs")[0];
			var elem3 = rows[i].getElementsByTagName("Notes")[0];
			var elem4 = rows[i].getElementsByTagName("HomePage")[0];
			var elem5 = rows[i].getElementsByTagName("Plane")[0];
			
			if(j==2)
			{
			var hublength = elem2.getElementsByTagName("Hub").length;
			html_text+="<td><ul>";
			for(k=0;k<hublength;k++)
			{
			if(elem2.getElementsByTagName("Hub")[k].childNodes.length == 0)
				html_text+="<li></li>"
			else
			{
			 var hubname = elem2.getElementsByTagName("Hub")[k].childNodes[0].nodeValue.trim();
			 if(k==0)
			 {
			 html_text+="<li><b>"+hubname+"</b></li>";
			 }
			 else
			 html_text+="<li>"+hubname+"</li>";
			 }
			}
			 html_text+="</ul></td>";
			}
			else if(j==4)
			{
			if(elem4.childNodes.length == 0)
				html_text+="<td></td>"
			else
			html_text+="<td><a href='"+elem4.childNodes[0].nodeValue.trim()+"'>"+elem4.childNodes[0].nodeValue.trim()+"</a></td>";
			}
			else if(j==5)
			{
			if(elem5.childNodes.length == 0)
				html_text+="<td></td>"
			else
			html_text+="<td><img src='"+elem5.childNodes[0].nodeValue.trim()+"' alt='planes' height='150' width='300'>";
			}
		
			 else if(j==0)
			 {
			 if(elem.childNodes.length == 0)
				html_text+="<td></td>"
			else
			  html_text+="<td>"+elem.childNodes[0].nodeValue.trim()+"</td>";
			  }
			else if(j==1)
			 {
			 if(elem1.childNodes.length == 0)
				html_text+="<td></td>"
			else
			  html_text+="<td>"+elem1.childNodes[0].nodeValue.trim()+"</td>";
			  }
		 else if(j==3)
			 {
			 if(elem3.childNodes.length == 0)
				html_text+="<td></td>"
			else
			  html_text+="<td>"+elem3.childNodes[0].nodeValue.trim()+"</td>";
			  }
			  
			}
					
			html_text+="</tr>";
		  }
		}		
           html_text+="</table>";
           html_text+="</body></html>"; 		   
}

function viewXML(what)
{
err = 0;
var URL = what.textbox1.value;
URL = URL.trim();
if(URL == "" || URL.length == 0|| URL == null){
	alert("Textbox is empty");
	return;
}

  function loadXML(url) {
  if (window.XMLHttpRequest)
  {
     xmlhttp=new XMLHttpRequest(); 

	 }
 else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");  
	}	
	
  var open = xmlhttp.open("GET",url,false);
  /*if(xmlhttp.status != 200)
  {
     alert("File Doesnt Exist");
		   err = 1;
		   return;
  }*/
try
{  
  xmlhttp.send();
 /* if(xhttp.status == 404)
  {
	alert("File Does not Exist/Invalid File Name");
	return;
	}*/
 }
 catch(e)
 {
 alert("File doesn't Exist");
 return;
 }
  xmlDoc=xmlhttp.responseXML;
  if(xmlhttp.status == 404){
	alert("File not found");
	return null;
  }
  if(xmlDoc == null){
  alert("Invalid xml File");
  return null;
  }
  return xmlDoc;   }
  
  xmlDoc = loadXML(URL);
  if(xmlDoc == null){
	return;
  }
 if (window.ActiveXObject)
 {  if (xmlDoc.parseError.errorCode != 0) {
    var myErr = xmlDoc.parseError;
    generateError(xmlDoc);
    hWin = window.open("", "Error", "height=600,width=930");
    hWin.document.write(html_text);
  } else {  generateHTML(xmlDoc);
            hWin = window.open("", "Assignment4", "height=600,width=930");
			console.log(html_text);
            hWin.document.write(html_text);   }
 } else {  
 
 generateHTML(xmlDoc);
// console.log("hello");
   //console.log(html_text);
   if(err == 0)
   {
    hWin = window.open("", "Assignment4", "height=600,width=930");
    hWin.document.write(html_text);  
    hWin.document.close();
	}
   }	
 }
 
/* function press_enter(event)
 {
 event = event||window.event;
 if(event.keyCode == 13){
 document.getElementById('button1').click();
 return false;
 }
 return false;
 }*/
</script>