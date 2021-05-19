import React, { useContext } from "react";
import { Database, sqliteDatabase } from "./db";
// import { inMemoryDatabase } from "../database/InMemoryDatabase";

// Initialize our Database context.
// Any implementation that matches the Database interface will do. We will go with our
// sqliteDatabase for this app.
const DatabaseContext = React.createContext<Database | undefined>(undefined);

// The provider which enables accessing our database context from it's component tree.
export const DatabaseProvider: React.FunctionComponent = function(props) {
  return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
  // Alternatively, try the InMemoryDatabase instead by commenting out the above line,
  // and uncommenting the one below.
  //return <DatabaseContext.Provider value={inMemoryDatabase} {...props} />;
};

// Hook to pull our database object from the context and return it.
// Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useDatabase(): Database {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return database;
}