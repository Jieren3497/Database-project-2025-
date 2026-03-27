import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.sql.*;

import java.net.InetSocketAddress;
import java.util.Map;
/*
In order to communicate with the DB server from a browser tab, you will need to append the route name to the url
*/
class Main {

 public static void main(String[] args)throws IOException{
    (new Main()).init();
  }

  void print(Object o){ System.out.println(o);}
  void printt(Object o){ System.out.print(o);}

  void init() throws IOException{   

    // Create a port - this is your Gateway
    int port = 8600;

    // Create the HTTPserver object
    HttpServer server = HttpServer.create(new InetSocketAddress(port),0);

    // Create the database object
    Database db = new Database("jdbc:sqlite:library.db");
    
    // Create a route handler to respond to the request (default route)
    server.createContext("/", new RouteHandler("You are connected but route not given or incorrect... ") );

    // create a route called 'Songs' that gets all song records.
    String sql = "";
    sql  = " Select * from Songs";
    server.createContext("/songs", new RouteHandler(db,sql) );

    // Create a route called 'Artists' that gets all artist records.
    sql  = " Select * from Artists Inner join Songs on Songs.ArtistName = Artists.ArtistName";
    server.createContext("/Artists", new RouteHandler(db,sql) ) ;
    
    // Create a route called 'Albums' that gets all album records
    sql  = "Select * from Albums Inner join Songs on Songs.ArtistName = Albums.ArtistName";
    server.createContext("/Albums", new RouteHandler(db,sql));

    // Start the server      
    server.start();
    System.out.println("Server is listening on port " + port);      
  }    
}


