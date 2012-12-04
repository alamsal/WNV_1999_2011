//*************************************//
//***********Aashis Lamsal ***********//
//***********************************//

//Varables to hold previous state of class, smooth, and color. 
var prvColor='';
var prvClassify='';
var prvSmooth='';	
var info='';
var popup=null;
//Varibles to hold pervious id of Map div, layer div and image legend
var prevmpdiv='wnmdiv';
var prevlydiv='wnldiv';
var prevlegid='legendid';
//Server that contains the shp information
var layerhost='http://globalmonitoring.sdstate.edu/geoserver/wms';  
 //Shape Name in the server
var layername='EastWeb:RSWNV';
// Global hash to hold human incidnece cases
var yearlyCases;

//Generate Map
function LoadMap(style,mapid,layerswitchid,legid,legendstyle)
{

	var map;	
	//////////////////////////////////////
	//Dynamically generate Map div
 	var mp_div = document.createElement('div');
	var divIdName =mapid;
	mp_div.setAttribute('id',divIdName);
	mp_div.style.width = "565px";
	mp_div.style.height = "480px";
	mp_div.style.left = "0px";
	mp_div.style.top = "0px";
	mp_div.style.position = "relative";	
	document.getElementById('wnmap').appendChild(mp_div); 
	///////////////////////////////////////////////////////////
	//Dynamically generete Layerswitcher div
	var ly_div = document.createElement('div');
	var divIdName1 =layerswitchid;
	ly_div.setAttribute('id',divIdName1);
	ly_div.style.width = "150px";
	ly_div.style.height = "50px";
	ly_div.style.left = "0px";
	ly_div.style.top = "0px";
	ly_div.style.position = "relative";	
	document.getElementById('wnlayer').appendChild(ly_div); 
	
	//////////////////////////////////////	
	//Generate Legend
	DisplayLegend(legid,legendstyle);
	/////////////////////////////////////
	

	//To split the styles yearly
	colstyle=style.split("|");
	// Avoid pink error tiles
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	OpenLayers.Util.onImageLoadErrorColor = "transparent";
	// Map is in mercator this time, so over-ride the default
	// options that assume lat/lon.
	/* var options = {
	  projection: new OpenLayers.Projection("EPSG:900913"),
	  displayProjection: new OpenLayers.Projection("EPSG:4326"),
	  units: "m",
	  numZoomLevels: 20,
	  maxResolution: 156543.0339,
	  maxExtent: new OpenLayers.Bounds(-20037508,-20037508,20037508,20037508.34)
	}; */
	
	var options = {
	  //projection: new OpenLayers.Projection("EPSG:900913"),
	  //displayProjection: new OpenLayers.Projection("EPSG:4326"),
	  units: "m",
	  maxResolution: "auto",
	  maxExtent: new OpenLayers.Bounds(-20037508,-20037508,20037508,20037508.34)

	};
	// Create the map object
	map = new OpenLayers.Map(mapid, options);
	
	// create Google Maps layer
	var gmap = new OpenLayers.Layer.Google(
	  "Google Streets", // the default
	  {'sphericalMercator': true,minZoomLevel: 3, maxZoomLevel: 7});
	/*
	// create Google Satellite layer
	var gsat = new OpenLayers.Layer.Google(
	  "Google Satellite",
	  {type: G_SATELLITE_MAP, 'sphericalMercator': true, minZoomLevel: 3, maxZoomLevel: 7});  */

	// create WNV 2010 layer
	var wnv2010 = new OpenLayers.Layer.WMS(
		   "2010",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[11]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var wnv2009 = new OpenLayers.Layer.WMS(
		   "2009",
		   layerhost, 
		   {'layers':layername ,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[10]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	//Change styles dynamically in fly	  
	//wnv2010.mergeNewParams({ styles:'wnvtest'});      

	// create WNV 2009 layer
	var wnv2008 = new OpenLayers.Layer.WMS(
		   "2008",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[9]},
		   {'opacity': 1.0, 'isBaseLayer': false, 'visibility': false}
	  );
	var wnv2007 = new OpenLayers.Layer.WMS(
		   "2007",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[8]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	//Change styles dynamically in fly	  
	//wnv2010.mergeNewParams({ styles:'wnvtest'});      

	// create WNV 2009 layer
	var wnv2006 = new OpenLayers.Layer.WMS(
		   "2006",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[7]},
		   {'opacity': 1.0, 'isBaseLayer': false, 'visibility': false}
	  );
	var wnv2005 = new OpenLayers.Layer.WMS(
		   "2005",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[6]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	//Change styles dynamically in fly	  
	//wnv2010.mergeNewParams({ styles:'wnvtest'});      

	// create WNV 2009 layer
	var wnv2004 = new OpenLayers.Layer.WMS(
		   "2004",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[5]},
		   {'opacity': 1.0, 'isBaseLayer': false, 'visibility': false}
	  );
	var wnv2003 = new OpenLayers.Layer.WMS(
		   "2003",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[4]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	//Change styles dynamically in fly	  
	//wnv2010.mergeNewParams({ styles:'wnvtest'});      

	// create WNV 2009 layer
	var wnv2002 = new OpenLayers.Layer.WMS(
		   "2002",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[3]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var wnv2001 = new OpenLayers.Layer.WMS(
		   "2001",
		  layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[2]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	//Change styles dynamically in fly	  
	//wnv2010.mergeNewParams({ styles:'wnvtest'});      

	// create WNV 2009 layer
	var wnv2000 = new OpenLayers.Layer.WMS(
		   "2000",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[1]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var wnv1999 = new OpenLayers.Layer.WMS(
		   "1999",
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':colstyle[0]},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': true}
	  );

	//Map Layer adder
	//map.addLayers([gmap, gsat,wnv1999,wnv2000,wnv2001,wnv2002,wnv2003,wnv2004,wnv2005,wnv2006,wnv2007,wnv2008,wnv2009,wnv2010]);  
	map.addLayers([gmap,wnv1999,wnv2000,wnv2001,wnv2002,wnv2003,wnv2004,wnv2005,wnv2006,wnv2007,wnv2008,wnv2009,wnv2010]);  
	// Map layer Switcher
	var layerswitcher=new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement(layerswitchid),roundedCorner:false});
	layerswitcher.ascending=false;  
	//map.addControl(new OpenLayers.Control.LayerSwitcher({}));

	map.addControl(layerswitcher);
	// Coordinate display at bottom of map
	//map.addControl(new OpenLayers.Control.PanZoomBar());

	// Zoom to Kansas
	var point = new OpenLayers.LonLat(-34.60,39.12); 
	// Need to convert zoom point to mercator too
	point.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()); 
	map.setCenter(point,1);   
	//alert(map.layers.length); 
	//alert(map.layers[1].visibility);
	//alert(map.getLayerIndex(wnv2000));
	//alert(map.layers[1].name);
	
	map.events.register('changelayer',map,function(e)
	{
		//alert(String(e.layer.getVisibility()));
		if(String(e.layer.getVisibility())=='true')
		{
			e.layer.setVisibility(true);
			for(var i=1;i<=12;i++)
			{
				if(String(e.layer.name)!=String(map.layers[i].name))
				{
					map.layers[i].setVisibility(false);
				}
			}	
		
		}	
		
		var classify=document.getElementById('classid').value;
		//var smooth=document.getElementById('smoothid').value;
		//var colors= document.getElementById('colorsid').value;
	
		if(classify=="quantile")
		{			
			GenerateLegend(String(e.layer.name),String(e.layer.visibility),colstyle);	
						
		} 
	});
	//////////////////////////////Start feature info section ///////////////////////////
	
	
	// support GetFeatureInfo
	OpenLayers.ProxyHost = "geoproxy.php?url=";
		/*
	map.events.register('click', map, function (e) {
		//alert(map.getExtent().toBBOX());
		x1=parseInt(e.xy.x);
		y1=parseInt(e.xy.y);
    var url = layerhost 
      + "?REQUEST=GetFeatureInfo"
      + "&EXCEPTIONS=application/vnd.ogc.se_xml"
      + "&BBOX=" + map.getExtent().toBBOX()
      + "&X=" + x1
      + "&Y=" + y1
      + "&INFO_FORMAT=text/html"
      + "&QUERY_LAYERS=" + layername
      + "&LAYERS="+layername
      + "&FEATURE_COUNT=50"
      + "&SRS=EPSG:900913"
      + "&STYLES="
      + "&WIDTH=" + map.size.w
      + "&HEIGHT=" + map.size.h;
    window.open(url,
      "getfeatureinfo",
      "location=10,status=10,scrollbars=1,width=600,height=150"
    );
  });
		*/
		/////////////////////////////////////////////////////////////////////////////////
	
	 map.events.register('click', map, function (e) {
                    document.getElementById('nodelist').innerHTML = "Loading... please wait...";
                                        
                   /* var params = {
                        REQUEST: "GetFeatureInfo",
                        EXCEPTIONS: "application/vnd.ogc.se_xml",
                        BBOX: map.getExtent().toBBOX(),
                        SERVICE: "WMS",
                        VERSION: "1.1.1",
                        X: parseInt(e.xy.x),
                        Y: parseInt(e.xy.y),
                        INFO_FORMAT: 'text/html',
                        QUERY_LAYERS:layername,
                        FEATURE_COUNT: "50",
                        Layers:layername,
                        Styles: '',
                        WIDTH: map.size.w,
                        HEIGHT: map.size.h,
                        //format: 'image/png',
                        //srs:'EPSG:900913'
                       }; */
				        x1=parseInt(e.xy.x);
						y1=parseInt(e.xy.y);
				    	var url = layerhost 
				      + "?REQUEST=GetFeatureInfo"
				      + "&EXCEPTIONS=application/vnd.ogc.se_xml"
				      + "&BBOX=" + map.getExtent().toBBOX()
				      + "&X=" + x1
				      + "&Y=" + y1
				      + "&INFO_FORMAT=text/plain" // [Supports: GML,plain,&HTML- No xml]
				      + "&QUERY_LAYERS=" + layername
				      + "&LAYERS="+layername
				      + "&FEATURE_COUNT=50"
				      + "&SRS=EPSG:900913"
				      + "&STYLES="
				      + "&WIDTH=" + map.size.w
				      + "&HEIGHT=" + map.size.h;
                    OpenLayers.loadURL(url, '', this, setHTML);
                    OpenLayers.Event.stop(e);
                });
               

///////////Close feature info section /////////////////////////////

}

// sets the HTML provided into the nodelist element
function setHTML(response){
	
	yearlyCases= new Object();
	document.getElementById('nodelist').innerHTML = response.responseText;
	var extract=response.responseText.split("=");
	var state=extract[2].slice(0,3);
	var county= extract[3].slice(0,-5);
	var pop=extract[6].slice(0,-7);
	var wnv99=extract[7].slice(0,-7);
	var wnv00=extract[8].slice(0,-7);
	var wnv01=extract[9].slice(0,-7);
	var wnv02=extract[10].slice(0,-7);
	var wnv03=extract[11].slice(0,-7);
	var wnv04=extract[12].slice(0,-7);
	var wnv05=extract[13].slice(0,-7);
	var wnv06=extract[14].slice(0,-7);
	var wnv07=extract[15].slice(0,-7);
	var wnv08=extract[16].slice(0,-7);
	var wnv09=extract[17].slice(0,-7);
	var wnv10=extract[18].slice(0,-11);
	
	//alert("state:"+state+"\n county:"+county+"\n pop:"+pop+"\n 99:"+wnv99+"\n 00:"+wnv00+"\n 01:"+wnv01
	//+"\n 02:"+wnv02+"\n 03:"+wnv03+"\n 04:"+wnv04+"\n 05:"+wnv05+"\n 06:"+wnv06+"\n 07:"+wnv07
	//+"\n 08:"+wnv08+"\n 09:"+wnv09+"\n 10:"+wnv10+"\n");
	/*
	yearlyCases["state"]=state;
	yearlyCases["county"]=county;
	yearlyCases["pop"]=pop;
	yearlyCases["wnv99"]=wnv99;
	yearlyCases["wnv00"]=wnv00;
	yearlyCases["wnv01"]=wnv01;
	yearlyCases["wnv02"]=wnv02;
	yearlyCases["wnv03"]=wnv03;
	yearlyCases["wnv04"]=wnv04;
	yearlyCases["wnv05"]=wnv05;
	yearlyCases["wnv06"]=wnv06;
	yearlyCases["wnv07"]=wnv07;
	yearlyCases["wnv08"]=wnv08;
	yearlyCases["wnv09"]=wnv09;
	yearlyCases["wnv10"]=wnv10;
	*/
	
	//google.load("visualization", "1", {packages:["corechart"]});
	
		
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Cases');  
		
		data.addRow(["99",parseInt(wnv99)]);
		data.addRow(["00",parseInt(wnv00)]);
		data.addRow(["01",parseInt(wnv01)]);
		data.addRow(["02",parseInt(wnv02)]);
		data.addRow(["03",parseInt(wnv03)]);
		data.addRow(["04",parseInt(wnv04)]);
		data.addRow(["05",parseInt(wnv05)]);
		data.addRow(["06",parseInt(wnv06)]);
		data.addRow(["07",parseInt(wnv07)]);
		data.addRow(["08",parseInt(wnv08)]);
		data.addRow(["09",parseInt(wnv09)]);
		data.addRow(["10",parseInt(wnv10)]);
		
		/*
        data.addRows(12);		
        data.setValue(0, 0, '99');
        data.setValue(0, 1, parseInt(wnv99));
      
        data.setValue(1, 0, '00');
        data.setValue(1, 1, parseInt(wnv00));
		
		data.setValue(2, 0, '01');
        data.setValue(2, 1, parseInt(wnv01));
		
		data.setValue(3, 0, '02');
        data.setValue(3, 1, parseInt(wnv02));
		
		data.setValue(4, 0, '03');
        data.setValue(4, 1, parseInt(wnv03));
		
		data.setValue(5, 0, '04');
        data.setValue(5, 1, parseInt(wnv04));
		
		data.setValue(6, 0, '05');
        data.setValue(6, 1, parseInt(wnv05));
       
        data.setValue(7, 0, '06');
        data.setValue(7, 1, parseInt(wnv06));
       
        data.setValue(8, 0, '07');
        data.setValue(8, 1, parseInt(wnv07));
		
		data.setValue(9, 0, '08');
        data.setValue(9, 1, parseInt(wnv08));
		
		data.setValue(10, 0, '09');
        data.setValue(10, 1, parseInt(wnv09));
		
		data.setValue(11, 0, '10');
        data.setValue(11, 1, parseInt(wnv10));
       

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, {width: 450, height: 190, title: county+","+state+': WNV Human Incidence Cases',
                          hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
                        }); */
        var chart= new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data,{width: 450, height: 190,vAxis: {maxValue: 10}});             
	
	}

//Dynamically generate legend image place	
function DisplayLegend(legid,legendstyle)
{
	var lg_img = document.createElement('img');
	var imgId=legid;
	lg_img.src=layerhost+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=45&HEIGHT=25&LAYER="+layername+"&LEGEND_OPTIONS=forceRule:True;dx:0.2;dy:0.2;mx:0.2;my:0.2;fontStyle:bold;borderColor:0000ff;border:true;fontColor:000000;fontSize:14&STYLE="+legendstyle;
	lg_img.setAttribute('id',imgId);
	lg_img.style.position = "relative";
	//lg_img.style.-moz-transform ='rotate(-90deg)';
	//lg_img.style.border = "1px solid #000";
	document.getElementById('legenddiv').appendChild(lg_img);
	
}

//Remove redundant divs
function RemoveDiv(mlayer,slayer,legend)
{	
	var mdiv=document.getElementById('wnmap');
	var ldiv=document.getElementById('wnlayer');
	var lgimg=document.getElementById('legenddiv');
	mdiv.removeChild(document.getElementById(mlayer));
	ldiv.removeChild(document.getElementById(slayer));
	lgimg.removeChild(document.getElementById(legend));
	
}

//Show-Hide/Toggle Overlay
function ToggleOverlay()
{
	var mapLayer=new Array('1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010');
	j=mapLayer.length;
}

//Generate seprate legends for quantile classification
function GenerateLegend(lname,lstatus,clrramp)
{	
	var lgdiv='legend'+new Date().getTime();
	var lgimg=document.getElementById('legenddiv');		
	var mapLayer=new Array('1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010');
	j=mapLayer.length;
	for( var i=0;i<=j;i++)
	{
		if((String(lname)==String(mapLayer[i]))&&(String(lstatus)=="true"))
		{					
			lgimg.removeChild(document.getElementById(prevlegid));
			DisplayLegend(lgdiv,clrramp[i]);
			prevlegid=lgdiv;
		}
	}
}


//Display Map
function ShowMap()
{	
	var color=document.getElementById("colorsid").value;
	var classify=document.getElementById("classid").value;
	var smooth=document.getElementById("smoothid").value;
	
	var yl_mn_rw,yl_mn_sm,yl_qn_rw,yl_qn_sm;
	var rd_mn_rw,rd_mn_sm,rd_qn_rw,rd_qn_sm;
	var yb_mn_rw,yb_mn_sm,yb_qn_rw,yb_qn_sm;	

	yl_mn_rw='ylorrd_mnrw_99|ylorrd_mnrw_00|ylorrd_mnrw_01|ylorrd_mnrw_02|ylorrd_mnrw_03|ylorrd_mnrw_04|ylorrd_mnrw_05|ylorrd_mnrw_06|ylorrd_mnrw_07|ylorrd_mnrw_08|ylorrd_mnrw_09|ylorrd_mnrw_10';
	yl_mn_sm='ylorrd_mnsm_99|ylorrd_mnsm_00|ylorrd_mnsm_01|ylorrd_mnsm_02|ylorrd_mnsm_03|ylorrd_mnsm_04|ylorrd_mnsm_05|ylorrd_mnsm_06|ylorrd_mnsm_07|ylorrd_mnsm_08|ylorrd_mnsm_09|ylorrd_mnsm_10';
	yl_qn_rw='ylorrd_qnrw_99|ylorrd_qnrw_00|ylorrd_qnrw_01|ylorrd_qnrw_02|ylorrd_qnrw_03|ylorrd_qnrw_04|ylorrd_qnrw_05|ylorrd_qnrw_06|ylorrd_qnrw_07|ylorrd_qnrw_08|ylorrd_qnrw_09|ylorrd_qnrw_10';	
	yl_qn_sm='ylorrd_qnsm_99|ylorrd_qnsm_00|ylorrd_qnsm_01|ylorrd_qnsm_02|ylorrd_qnsm_03|ylorrd_qnsm_04|ylorrd_qnsm_05|ylorrd_qnsm_06|ylorrd_qnsm_07|ylorrd_qnsm_08|ylorrd_qnsm_09|ylorrd_qnsm_10';	
		
	rd_mn_rw='purd_mnrw_99|purd_mnrw_00|purd_mnrw_01|purd_mnrw_02|purd_mnrw_03|purd_mnrw_04|purd_mnrw_05|purd_mnrw_06|purd_mnrw_07|purd_mnrw_08|purd_mnrw_09|purd_mnrw_10';
	rd_mn_sm='purd_mnsm_99|purd_mnsm_00|purd_mnsm_01|purd_mnsm_02|purd_mnsm_03|purd_mnsm_04|purd_mnsm_05|purd_mnsm_06|purd_mnsm_07|purd_mnsm_08|purd_mnsm_09|purd_mnsm_10';
	rd_qn_rw='purd_qnrw_99|purd_qnrw_00|purd_qnrw_01|purd_qnrw_02|purd_qnrw_03|purd_qnrw_04|purd_qnrw_05|purd_qnrw_06|purd_qnrw_07|purd_qnrw_08|purd_qnrw_09|purd_qnrw_10';
	rd_qn_sm='purd_qnsm_99|purd_qnsm_00|purd_qnsm_01|purd_qnsm_02|purd_qnsm_03|purd_qnsm_04|purd_qnsm_05|purd_qnsm_06|purd_qnsm_07|purd_qnsm_08|purd_qnsm_09|purd_qnsm_10';
	
	yb_mn_rw='ylbl_mnrw_99|ylbl_mnrw_00|ylbl_mnrw_01|ylbl_mnrw_02|ylbl_mnrw_03|ylbl_mnrw_04|ylbl_mnrw_05|ylbl_mnrw_06|ylbl_mnrw_07|ylbl_mnrw_08|ylbl_mnrw_09|ylbl_mnrw_10';
	yb_mn_sm='ylbl_mnsm_99|ylbl_mnsm_00|ylbl_mnsm_01|ylbl_mnsm_02|ylbl_mnsm_03|ylbl_mnsm_04|ylbl_mnsm_05|ylbl_mnsm_06|ylbl_mnsm_07|ylbl_mnsm_08|ylbl_mnsm_09|ylbl_mnsm_10';
	yb_qn_rw='ylbl_qnrw_99|ylbl_qnrw_00|ylbl_qnrw_01|ylbl_qnrw_02|ylbl_qnrw_03|ylbl_qnrw_04|ylbl_qnrw_05|ylbl_qnrw_06|ylbl_qnrw_07|ylbl_qnrw_08|ylbl_qnrw_09|ylbl_qnrw_10';
	yb_qn_sm='ylbl_qnsm_99|ylbl_qnsm_00|ylbl_qnsm_01|ylbl_qnsm_02|ylbl_qnsm_03|ylbl_qnsm_04|ylbl_qnsm_05|ylbl_qnsm_06|ylbl_qnsm_07|ylbl_qnsm_08|ylbl_qnsm_09|ylbl_qnsm_10';
	
	
	
	
	if(prvColor!=color||prvClassify!=classify||prvSmooth!=smooth)
	{
		var prvColor=color;
		var prvClassify=classify;
		var prvSmooth=smooth;
		var mpdiv='map'+new Date().getTime();
		var lydiv='layer'+new Date().getTime();
		var lgdiv='legend'+new Date().getTime();
		
		RemoveDiv(prevmpdiv,prevlydiv,prevlegid);
		
		switch(color)
		{
			case "YlOrRd":
				switch(classify)
				{
					case "manual":
						if(smooth=="raw")
						{							
											
							LoadMap(yl_mn_rw,mpdiv,lydiv,lgdiv,'ylorrd_mnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
						else
						{							
							
							LoadMap(yl_mn_sm,mpdiv,lydiv,lgdiv,'ylorrd_mnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;
							prevlegid=lgdiv;
						}
					break;
					case"quantile":
						if(smooth=="raw")
						{

							
							LoadMap(yl_qn_rw,mpdiv,lydiv,lgdiv,'ylorrd_qnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;
							prevlegid=lgdiv;	
						}
						else
						{
							
							LoadMap(yl_qn_sm,mpdiv,lydiv,lgdiv,'ylorrd_qnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;							
							prevlegid=lgdiv;
					
						}
					break;
					default:
					{	
						alert('Never appears !! YlOrRd');
					}
					
				}
			break;
			
			case "PuRd":
			switch(classify)
				{
					case "manual":
						if(smooth=="raw")
						{
							
							
							LoadMap(rd_mn_rw,mpdiv,lydiv,lgdiv,'purd_mnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
						else
						{
							
							
							LoadMap(rd_mn_sm,mpdiv,lydiv,lgdiv,'purd_mnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
					break;
					default:
						if(smooth=="raw")
						{
							
							LoadMap(rd_qn_rw,mpdiv,lydiv,lgdiv,'purd_qnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
						else
						{

							
							LoadMap(rd_qn_sm,mpdiv,lydiv,lgdiv,'purd_qnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
					break;
				}
			break;
			
			case"YlGnBu":
			switch(classify)
				{
					case "manual":
						if(smooth=="raw")
						{
							
						
							LoadMap(yb_mn_rw,mpdiv,lydiv,lgdiv,'ylbl_mnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
						else
						{
							
							
							LoadMap(yb_mn_sm,mpdiv,lydiv,lgdiv,'ylbl_mnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
					break;
					default:
						if(smooth=="raw")
						{
							
							
							LoadMap(yb_qn_rw,mpdiv,lydiv,lgdiv,'ylbl_qnrw_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
						else
						{
							
						
							LoadMap(yb_qn_sm,mpdiv,lydiv,lgdiv,'ylbl_qnsm_99');
							prevmpdiv=mpdiv;
							prevlydiv=lydiv;	
							prevlegid=lgdiv;
						}
					break;
				}
			break;
			default:
			alert('Never Appears!!!');
			break;
			
		}
	}
}


