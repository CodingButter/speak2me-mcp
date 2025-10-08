
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model VoiceConfig
 * 
 */
export type VoiceConfig = $Result.DefaultSelection<Prisma.$VoiceConfigPayload>
/**
 * Model ClaudeConfig
 * 
 */
export type ClaudeConfig = $Result.DefaultSelection<Prisma.$ClaudeConfigPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>
/**
 * Model ProjectContext
 * 
 */
export type ProjectContext = $Result.DefaultSelection<Prisma.$ProjectContextPayload>
/**
 * Model Todo
 * 
 */
export type Todo = $Result.DefaultSelection<Prisma.$TodoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TodoStatus: {
  BACKLOG: 'BACKLOG',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus]


export const Priority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type Priority = (typeof Priority)[keyof typeof Priority]

}

export type TodoStatus = $Enums.TodoStatus

export const TodoStatus: typeof $Enums.TodoStatus

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voiceConfig`: Exposes CRUD operations for the **VoiceConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoiceConfigs
    * const voiceConfigs = await prisma.voiceConfig.findMany()
    * ```
    */
  get voiceConfig(): Prisma.VoiceConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claudeConfig`: Exposes CRUD operations for the **ClaudeConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaudeConfigs
    * const claudeConfigs = await prisma.claudeConfig.findMany()
    * ```
    */
  get claudeConfig(): Prisma.ClaudeConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectContext`: Exposes CRUD operations for the **ProjectContext** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectContexts
    * const projectContexts = await prisma.projectContext.findMany()
    * ```
    */
  get projectContext(): Prisma.ProjectContextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **Todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): Prisma.TodoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    Conversation: 'Conversation',
    Message: 'Message',
    ApiKey: 'ApiKey',
    VoiceConfig: 'VoiceConfig',
    ClaudeConfig: 'ClaudeConfig',
    Settings: 'Settings',
    ProjectContext: 'ProjectContext',
    Todo: 'Todo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "conversation" | "message" | "apiKey" | "voiceConfig" | "claudeConfig" | "settings" | "projectContext" | "todo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      VoiceConfig: {
        payload: Prisma.$VoiceConfigPayload<ExtArgs>
        fields: Prisma.VoiceConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoiceConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoiceConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          findFirst: {
            args: Prisma.VoiceConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoiceConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          findMany: {
            args: Prisma.VoiceConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>[]
          }
          create: {
            args: Prisma.VoiceConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          createMany: {
            args: Prisma.VoiceConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoiceConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>[]
          }
          delete: {
            args: Prisma.VoiceConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          update: {
            args: Prisma.VoiceConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          deleteMany: {
            args: Prisma.VoiceConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoiceConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoiceConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>[]
          }
          upsert: {
            args: Prisma.VoiceConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceConfigPayload>
          }
          aggregate: {
            args: Prisma.VoiceConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoiceConfig>
          }
          groupBy: {
            args: Prisma.VoiceConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoiceConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoiceConfigCountArgs<ExtArgs>
            result: $Utils.Optional<VoiceConfigCountAggregateOutputType> | number
          }
        }
      }
      ClaudeConfig: {
        payload: Prisma.$ClaudeConfigPayload<ExtArgs>
        fields: Prisma.ClaudeConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaudeConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaudeConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          findFirst: {
            args: Prisma.ClaudeConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaudeConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          findMany: {
            args: Prisma.ClaudeConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>[]
          }
          create: {
            args: Prisma.ClaudeConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          createMany: {
            args: Prisma.ClaudeConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaudeConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>[]
          }
          delete: {
            args: Prisma.ClaudeConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          update: {
            args: Prisma.ClaudeConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          deleteMany: {
            args: Prisma.ClaudeConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaudeConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaudeConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>[]
          }
          upsert: {
            args: Prisma.ClaudeConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaudeConfigPayload>
          }
          aggregate: {
            args: Prisma.ClaudeConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaudeConfig>
          }
          groupBy: {
            args: Prisma.ClaudeConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaudeConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaudeConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ClaudeConfigCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
      ProjectContext: {
        payload: Prisma.$ProjectContextPayload<ExtArgs>
        fields: Prisma.ProjectContextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectContextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectContextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          findFirst: {
            args: Prisma.ProjectContextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectContextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          findMany: {
            args: Prisma.ProjectContextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>[]
          }
          create: {
            args: Prisma.ProjectContextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          createMany: {
            args: Prisma.ProjectContextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectContextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>[]
          }
          delete: {
            args: Prisma.ProjectContextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          update: {
            args: Prisma.ProjectContextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          deleteMany: {
            args: Prisma.ProjectContextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectContextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectContextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>[]
          }
          upsert: {
            args: Prisma.ProjectContextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContextPayload>
          }
          aggregate: {
            args: Prisma.ProjectContextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectContext>
          }
          groupBy: {
            args: Prisma.ProjectContextGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectContextGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectContextCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectContextCountAggregateOutputType> | number
          }
        }
      }
      Todo: {
        payload: Prisma.$TodoPayload<ExtArgs>
        fields: Prisma.TodoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TodoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TodoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findFirst: {
            args: Prisma.TodoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TodoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findMany: {
            args: Prisma.TodoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          create: {
            args: Prisma.TodoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          createMany: {
            args: Prisma.TodoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TodoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          delete: {
            args: Prisma.TodoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          update: {
            args: Prisma.TodoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          deleteMany: {
            args: Prisma.TodoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TodoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TodoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          upsert: {
            args: Prisma.TodoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          aggregate: {
            args: Prisma.TodoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodo>
          }
          groupBy: {
            args: Prisma.TodoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TodoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TodoCountArgs<ExtArgs>
            result: $Utils.Optional<TodoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    apiKey?: ApiKeyOmit
    voiceConfig?: VoiceConfigOmit
    claudeConfig?: ClaudeConfigOmit
    settings?: SettingsOmit
    projectContext?: ProjectContextOmit
    todo?: TodoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    conversations: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | ProjectCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversations?: boolean | Project$conversationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | Project$conversationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends Project$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.conversations
   */
  export type Project$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _avg: ConversationAvgAggregateOutputType | null
    _sum: ConversationSumAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type ConversationSumAggregateOutputType = {
    messageCount: number | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    messageCount: number | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    messageCount: number | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    createdAt: number
    updatedAt: number
    messageCount: number
    _all: number
  }


  export type ConversationAvgAggregateInputType = {
    messageCount?: true
  }

  export type ConversationSumAggregateInputType = {
    messageCount?: true
  }

  export type ConversationMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    messageCount?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    messageCount?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    messageCount?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConversationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConversationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _avg?: ConversationAvgAggregateInputType
    _sum?: ConversationSumAggregateInputType
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    projectId: string | null
    name: string | null
    createdAt: Date
    updatedAt: Date
    messageCount: number
    _count: ConversationCountAggregateOutputType | null
    _avg: ConversationAvgAggregateOutputType | null
    _sum: ConversationSumAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messageCount?: boolean
    project?: boolean | Conversation$projectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    apiKeys?: boolean | Conversation$apiKeysArgs<ExtArgs>
    voiceConfig?: boolean | Conversation$voiceConfigArgs<ExtArgs>
    projectContext?: boolean | Conversation$projectContextArgs<ExtArgs>
    claudeConfig?: boolean | Conversation$claudeConfigArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messageCount?: boolean
    project?: boolean | Conversation$projectArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messageCount?: boolean
    project?: boolean | Conversation$projectArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messageCount?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "createdAt" | "updatedAt" | "messageCount", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Conversation$projectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    apiKeys?: boolean | Conversation$apiKeysArgs<ExtArgs>
    voiceConfig?: boolean | Conversation$voiceConfigArgs<ExtArgs>
    projectContext?: boolean | Conversation$projectContextArgs<ExtArgs>
    claudeConfig?: boolean | Conversation$claudeConfigArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Conversation$projectArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Conversation$projectArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs> | null
      voiceConfig: Prisma.$VoiceConfigPayload<ExtArgs> | null
      projectContext: Prisma.$ProjectContextPayload<ExtArgs> | null
      claudeConfig: Prisma.$ClaudeConfigPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string | null
      name: string | null
      createdAt: Date
      updatedAt: Date
      messageCount: number
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends Conversation$projectArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiKeys<T extends Conversation$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$apiKeysArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    voiceConfig<T extends Conversation$voiceConfigArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$voiceConfigArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    projectContext<T extends Conversation$projectContextArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$projectContextArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    claudeConfig<T extends Conversation$claudeConfigArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$claudeConfigArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly projectId: FieldRef<"Conversation", 'String'>
    readonly name: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
    readonly messageCount: FieldRef<"Conversation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.project
   */
  export type Conversation$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.apiKeys
   */
  export type Conversation$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
  }

  /**
   * Conversation.voiceConfig
   */
  export type Conversation$voiceConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    where?: VoiceConfigWhereInput
  }

  /**
   * Conversation.projectContext
   */
  export type Conversation$projectContextArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    where?: ProjectContextWhereInput
  }

  /**
   * Conversation.claudeConfig
   */
  export type Conversation$claudeConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    where?: ClaudeConfigWhereInput
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    audioUrl: string | null
    ssmlUsed: string | null
    timestamp: Date | null
    metrics: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    audioUrl: string | null
    ssmlUsed: string | null
    timestamp: Date | null
    metrics: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    audioUrl: number
    ssmlUsed: number
    timestamp: number
    metrics: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    ssmlUsed?: true
    timestamp?: true
    metrics?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    ssmlUsed?: true
    timestamp?: true
    metrics?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    ssmlUsed?: true
    timestamp?: true
    metrics?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    role: string
    content: string
    audioUrl: string | null
    ssmlUsed: string | null
    timestamp: Date
    metrics: string | null
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    ssmlUsed?: boolean
    timestamp?: boolean
    metrics?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    ssmlUsed?: boolean
    timestamp?: boolean
    metrics?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    ssmlUsed?: boolean
    timestamp?: boolean
    metrics?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    ssmlUsed?: boolean
    timestamp?: boolean
    metrics?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "role" | "content" | "audioUrl" | "ssmlUsed" | "timestamp" | "metrics", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      role: string
      content: string
      audioUrl: string | null
      ssmlUsed: string | null
      timestamp: Date
      metrics: string | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly audioUrl: FieldRef<"Message", 'String'>
    readonly ssmlUsed: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'DateTime'>
    readonly metrics: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    openai: string | null
    elevenlabs: string | null
    gemini: string | null
    anthropic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    openai: string | null
    elevenlabs: string | null
    gemini: string | null
    anthropic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    conversationId: number
    openai: number
    elevenlabs: number
    gemini: number
    anthropic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    conversationId?: true
    openai?: true
    elevenlabs?: true
    gemini?: true
    anthropic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    conversationId?: true
    openai?: true
    elevenlabs?: true
    gemini?: true
    anthropic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    conversationId?: true
    openai?: true
    elevenlabs?: true
    gemini?: true
    anthropic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    conversationId: string
    openai: string | null
    elevenlabs: string | null
    gemini: string | null
    anthropic: string | null
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    openai?: boolean
    elevenlabs?: boolean
    gemini?: boolean
    anthropic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    openai?: boolean
    elevenlabs?: boolean
    gemini?: boolean
    anthropic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    openai?: boolean
    elevenlabs?: boolean
    gemini?: boolean
    anthropic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    conversationId?: boolean
    openai?: boolean
    elevenlabs?: boolean
    gemini?: boolean
    anthropic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "openai" | "elevenlabs" | "gemini" | "anthropic" | "createdAt" | "updatedAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      openai: string | null
      elevenlabs: string | null
      gemini: string | null
      anthropic: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly conversationId: FieldRef<"ApiKey", 'String'>
    readonly openai: FieldRef<"ApiKey", 'String'>
    readonly elevenlabs: FieldRef<"ApiKey", 'String'>
    readonly gemini: FieldRef<"ApiKey", 'String'>
    readonly anthropic: FieldRef<"ApiKey", 'String'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model VoiceConfig
   */

  export type AggregateVoiceConfig = {
    _count: VoiceConfigCountAggregateOutputType | null
    _avg: VoiceConfigAvgAggregateOutputType | null
    _sum: VoiceConfigSumAggregateOutputType | null
    _min: VoiceConfigMinAggregateOutputType | null
    _max: VoiceConfigMaxAggregateOutputType | null
  }

  export type VoiceConfigAvgAggregateOutputType = {
    maxBreaksPer100Words: number | null
  }

  export type VoiceConfigSumAggregateOutputType = {
    maxBreaksPer100Words: number | null
  }

  export type VoiceConfigMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    voiceId: string | null
    model: string | null
    ssmlEnabled: boolean | null
    ssmlModel: string | null
    prosodyEnabled: boolean | null
    emphasisEnabled: boolean | null
    phonemesEnabled: boolean | null
    formality: string | null
    maxBreaksPer100Words: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoiceConfigMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    voiceId: string | null
    model: string | null
    ssmlEnabled: boolean | null
    ssmlModel: string | null
    prosodyEnabled: boolean | null
    emphasisEnabled: boolean | null
    phonemesEnabled: boolean | null
    formality: string | null
    maxBreaksPer100Words: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoiceConfigCountAggregateOutputType = {
    id: number
    conversationId: number
    voiceId: number
    model: number
    ssmlEnabled: number
    ssmlModel: number
    prosodyEnabled: number
    emphasisEnabled: number
    phonemesEnabled: number
    formality: number
    maxBreaksPer100Words: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VoiceConfigAvgAggregateInputType = {
    maxBreaksPer100Words?: true
  }

  export type VoiceConfigSumAggregateInputType = {
    maxBreaksPer100Words?: true
  }

  export type VoiceConfigMinAggregateInputType = {
    id?: true
    conversationId?: true
    voiceId?: true
    model?: true
    ssmlEnabled?: true
    ssmlModel?: true
    prosodyEnabled?: true
    emphasisEnabled?: true
    phonemesEnabled?: true
    formality?: true
    maxBreaksPer100Words?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoiceConfigMaxAggregateInputType = {
    id?: true
    conversationId?: true
    voiceId?: true
    model?: true
    ssmlEnabled?: true
    ssmlModel?: true
    prosodyEnabled?: true
    emphasisEnabled?: true
    phonemesEnabled?: true
    formality?: true
    maxBreaksPer100Words?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoiceConfigCountAggregateInputType = {
    id?: true
    conversationId?: true
    voiceId?: true
    model?: true
    ssmlEnabled?: true
    ssmlModel?: true
    prosodyEnabled?: true
    emphasisEnabled?: true
    phonemesEnabled?: true
    formality?: true
    maxBreaksPer100Words?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VoiceConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceConfig to aggregate.
     */
    where?: VoiceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceConfigs to fetch.
     */
    orderBy?: VoiceConfigOrderByWithRelationInput | VoiceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoiceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoiceConfigs
    **/
    _count?: true | VoiceConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoiceConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoiceConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoiceConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoiceConfigMaxAggregateInputType
  }

  export type GetVoiceConfigAggregateType<T extends VoiceConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateVoiceConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoiceConfig[P]>
      : GetScalarType<T[P], AggregateVoiceConfig[P]>
  }




  export type VoiceConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoiceConfigWhereInput
    orderBy?: VoiceConfigOrderByWithAggregationInput | VoiceConfigOrderByWithAggregationInput[]
    by: VoiceConfigScalarFieldEnum[] | VoiceConfigScalarFieldEnum
    having?: VoiceConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoiceConfigCountAggregateInputType | true
    _avg?: VoiceConfigAvgAggregateInputType
    _sum?: VoiceConfigSumAggregateInputType
    _min?: VoiceConfigMinAggregateInputType
    _max?: VoiceConfigMaxAggregateInputType
  }

  export type VoiceConfigGroupByOutputType = {
    id: string
    conversationId: string
    voiceId: string | null
    model: string
    ssmlEnabled: boolean
    ssmlModel: string
    prosodyEnabled: boolean
    emphasisEnabled: boolean
    phonemesEnabled: boolean
    formality: string
    maxBreaksPer100Words: number
    createdAt: Date
    updatedAt: Date
    _count: VoiceConfigCountAggregateOutputType | null
    _avg: VoiceConfigAvgAggregateOutputType | null
    _sum: VoiceConfigSumAggregateOutputType | null
    _min: VoiceConfigMinAggregateOutputType | null
    _max: VoiceConfigMaxAggregateOutputType | null
  }

  type GetVoiceConfigGroupByPayload<T extends VoiceConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoiceConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoiceConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoiceConfigGroupByOutputType[P]>
            : GetScalarType<T[P], VoiceConfigGroupByOutputType[P]>
        }
      >
    >


  export type VoiceConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    voiceId?: boolean
    model?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: boolean
    maxBreaksPer100Words?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voiceConfig"]>

  export type VoiceConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    voiceId?: boolean
    model?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: boolean
    maxBreaksPer100Words?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voiceConfig"]>

  export type VoiceConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    voiceId?: boolean
    model?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: boolean
    maxBreaksPer100Words?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voiceConfig"]>

  export type VoiceConfigSelectScalar = {
    id?: boolean
    conversationId?: boolean
    voiceId?: boolean
    model?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: boolean
    maxBreaksPer100Words?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VoiceConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "voiceId" | "model" | "ssmlEnabled" | "ssmlModel" | "prosodyEnabled" | "emphasisEnabled" | "phonemesEnabled" | "formality" | "maxBreaksPer100Words" | "createdAt" | "updatedAt", ExtArgs["result"]["voiceConfig"]>
  export type VoiceConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type VoiceConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type VoiceConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $VoiceConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoiceConfig"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      voiceId: string | null
      model: string
      ssmlEnabled: boolean
      ssmlModel: string
      prosodyEnabled: boolean
      emphasisEnabled: boolean
      phonemesEnabled: boolean
      formality: string
      maxBreaksPer100Words: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["voiceConfig"]>
    composites: {}
  }

  type VoiceConfigGetPayload<S extends boolean | null | undefined | VoiceConfigDefaultArgs> = $Result.GetResult<Prisma.$VoiceConfigPayload, S>

  type VoiceConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoiceConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoiceConfigCountAggregateInputType | true
    }

  export interface VoiceConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoiceConfig'], meta: { name: 'VoiceConfig' } }
    /**
     * Find zero or one VoiceConfig that matches the filter.
     * @param {VoiceConfigFindUniqueArgs} args - Arguments to find a VoiceConfig
     * @example
     * // Get one VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoiceConfigFindUniqueArgs>(args: SelectSubset<T, VoiceConfigFindUniqueArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VoiceConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoiceConfigFindUniqueOrThrowArgs} args - Arguments to find a VoiceConfig
     * @example
     * // Get one VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoiceConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, VoiceConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoiceConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigFindFirstArgs} args - Arguments to find a VoiceConfig
     * @example
     * // Get one VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoiceConfigFindFirstArgs>(args?: SelectSubset<T, VoiceConfigFindFirstArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoiceConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigFindFirstOrThrowArgs} args - Arguments to find a VoiceConfig
     * @example
     * // Get one VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoiceConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, VoiceConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VoiceConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoiceConfigs
     * const voiceConfigs = await prisma.voiceConfig.findMany()
     * 
     * // Get first 10 VoiceConfigs
     * const voiceConfigs = await prisma.voiceConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voiceConfigWithIdOnly = await prisma.voiceConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoiceConfigFindManyArgs>(args?: SelectSubset<T, VoiceConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VoiceConfig.
     * @param {VoiceConfigCreateArgs} args - Arguments to create a VoiceConfig.
     * @example
     * // Create one VoiceConfig
     * const VoiceConfig = await prisma.voiceConfig.create({
     *   data: {
     *     // ... data to create a VoiceConfig
     *   }
     * })
     * 
     */
    create<T extends VoiceConfigCreateArgs>(args: SelectSubset<T, VoiceConfigCreateArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VoiceConfigs.
     * @param {VoiceConfigCreateManyArgs} args - Arguments to create many VoiceConfigs.
     * @example
     * // Create many VoiceConfigs
     * const voiceConfig = await prisma.voiceConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoiceConfigCreateManyArgs>(args?: SelectSubset<T, VoiceConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoiceConfigs and returns the data saved in the database.
     * @param {VoiceConfigCreateManyAndReturnArgs} args - Arguments to create many VoiceConfigs.
     * @example
     * // Create many VoiceConfigs
     * const voiceConfig = await prisma.voiceConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoiceConfigs and only return the `id`
     * const voiceConfigWithIdOnly = await prisma.voiceConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoiceConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, VoiceConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VoiceConfig.
     * @param {VoiceConfigDeleteArgs} args - Arguments to delete one VoiceConfig.
     * @example
     * // Delete one VoiceConfig
     * const VoiceConfig = await prisma.voiceConfig.delete({
     *   where: {
     *     // ... filter to delete one VoiceConfig
     *   }
     * })
     * 
     */
    delete<T extends VoiceConfigDeleteArgs>(args: SelectSubset<T, VoiceConfigDeleteArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VoiceConfig.
     * @param {VoiceConfigUpdateArgs} args - Arguments to update one VoiceConfig.
     * @example
     * // Update one VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoiceConfigUpdateArgs>(args: SelectSubset<T, VoiceConfigUpdateArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VoiceConfigs.
     * @param {VoiceConfigDeleteManyArgs} args - Arguments to filter VoiceConfigs to delete.
     * @example
     * // Delete a few VoiceConfigs
     * const { count } = await prisma.voiceConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoiceConfigDeleteManyArgs>(args?: SelectSubset<T, VoiceConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoiceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoiceConfigs
     * const voiceConfig = await prisma.voiceConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoiceConfigUpdateManyArgs>(args: SelectSubset<T, VoiceConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoiceConfigs and returns the data updated in the database.
     * @param {VoiceConfigUpdateManyAndReturnArgs} args - Arguments to update many VoiceConfigs.
     * @example
     * // Update many VoiceConfigs
     * const voiceConfig = await prisma.voiceConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VoiceConfigs and only return the `id`
     * const voiceConfigWithIdOnly = await prisma.voiceConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoiceConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, VoiceConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VoiceConfig.
     * @param {VoiceConfigUpsertArgs} args - Arguments to update or create a VoiceConfig.
     * @example
     * // Update or create a VoiceConfig
     * const voiceConfig = await prisma.voiceConfig.upsert({
     *   create: {
     *     // ... data to create a VoiceConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoiceConfig we want to update
     *   }
     * })
     */
    upsert<T extends VoiceConfigUpsertArgs>(args: SelectSubset<T, VoiceConfigUpsertArgs<ExtArgs>>): Prisma__VoiceConfigClient<$Result.GetResult<Prisma.$VoiceConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VoiceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigCountArgs} args - Arguments to filter VoiceConfigs to count.
     * @example
     * // Count the number of VoiceConfigs
     * const count = await prisma.voiceConfig.count({
     *   where: {
     *     // ... the filter for the VoiceConfigs we want to count
     *   }
     * })
    **/
    count<T extends VoiceConfigCountArgs>(
      args?: Subset<T, VoiceConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoiceConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoiceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoiceConfigAggregateArgs>(args: Subset<T, VoiceConfigAggregateArgs>): Prisma.PrismaPromise<GetVoiceConfigAggregateType<T>>

    /**
     * Group by VoiceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoiceConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoiceConfigGroupByArgs['orderBy'] }
        : { orderBy?: VoiceConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoiceConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoiceConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoiceConfig model
   */
  readonly fields: VoiceConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoiceConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoiceConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoiceConfig model
   */
  interface VoiceConfigFieldRefs {
    readonly id: FieldRef<"VoiceConfig", 'String'>
    readonly conversationId: FieldRef<"VoiceConfig", 'String'>
    readonly voiceId: FieldRef<"VoiceConfig", 'String'>
    readonly model: FieldRef<"VoiceConfig", 'String'>
    readonly ssmlEnabled: FieldRef<"VoiceConfig", 'Boolean'>
    readonly ssmlModel: FieldRef<"VoiceConfig", 'String'>
    readonly prosodyEnabled: FieldRef<"VoiceConfig", 'Boolean'>
    readonly emphasisEnabled: FieldRef<"VoiceConfig", 'Boolean'>
    readonly phonemesEnabled: FieldRef<"VoiceConfig", 'Boolean'>
    readonly formality: FieldRef<"VoiceConfig", 'String'>
    readonly maxBreaksPer100Words: FieldRef<"VoiceConfig", 'Int'>
    readonly createdAt: FieldRef<"VoiceConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"VoiceConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VoiceConfig findUnique
   */
  export type VoiceConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter, which VoiceConfig to fetch.
     */
    where: VoiceConfigWhereUniqueInput
  }

  /**
   * VoiceConfig findUniqueOrThrow
   */
  export type VoiceConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter, which VoiceConfig to fetch.
     */
    where: VoiceConfigWhereUniqueInput
  }

  /**
   * VoiceConfig findFirst
   */
  export type VoiceConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter, which VoiceConfig to fetch.
     */
    where?: VoiceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceConfigs to fetch.
     */
    orderBy?: VoiceConfigOrderByWithRelationInput | VoiceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceConfigs.
     */
    cursor?: VoiceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceConfigs.
     */
    distinct?: VoiceConfigScalarFieldEnum | VoiceConfigScalarFieldEnum[]
  }

  /**
   * VoiceConfig findFirstOrThrow
   */
  export type VoiceConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter, which VoiceConfig to fetch.
     */
    where?: VoiceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceConfigs to fetch.
     */
    orderBy?: VoiceConfigOrderByWithRelationInput | VoiceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceConfigs.
     */
    cursor?: VoiceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceConfigs.
     */
    distinct?: VoiceConfigScalarFieldEnum | VoiceConfigScalarFieldEnum[]
  }

  /**
   * VoiceConfig findMany
   */
  export type VoiceConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter, which VoiceConfigs to fetch.
     */
    where?: VoiceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceConfigs to fetch.
     */
    orderBy?: VoiceConfigOrderByWithRelationInput | VoiceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoiceConfigs.
     */
    cursor?: VoiceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceConfigs.
     */
    skip?: number
    distinct?: VoiceConfigScalarFieldEnum | VoiceConfigScalarFieldEnum[]
  }

  /**
   * VoiceConfig create
   */
  export type VoiceConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a VoiceConfig.
     */
    data: XOR<VoiceConfigCreateInput, VoiceConfigUncheckedCreateInput>
  }

  /**
   * VoiceConfig createMany
   */
  export type VoiceConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoiceConfigs.
     */
    data: VoiceConfigCreateManyInput | VoiceConfigCreateManyInput[]
  }

  /**
   * VoiceConfig createManyAndReturn
   */
  export type VoiceConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * The data used to create many VoiceConfigs.
     */
    data: VoiceConfigCreateManyInput | VoiceConfigCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoiceConfig update
   */
  export type VoiceConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a VoiceConfig.
     */
    data: XOR<VoiceConfigUpdateInput, VoiceConfigUncheckedUpdateInput>
    /**
     * Choose, which VoiceConfig to update.
     */
    where: VoiceConfigWhereUniqueInput
  }

  /**
   * VoiceConfig updateMany
   */
  export type VoiceConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoiceConfigs.
     */
    data: XOR<VoiceConfigUpdateManyMutationInput, VoiceConfigUncheckedUpdateManyInput>
    /**
     * Filter which VoiceConfigs to update
     */
    where?: VoiceConfigWhereInput
    /**
     * Limit how many VoiceConfigs to update.
     */
    limit?: number
  }

  /**
   * VoiceConfig updateManyAndReturn
   */
  export type VoiceConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * The data used to update VoiceConfigs.
     */
    data: XOR<VoiceConfigUpdateManyMutationInput, VoiceConfigUncheckedUpdateManyInput>
    /**
     * Filter which VoiceConfigs to update
     */
    where?: VoiceConfigWhereInput
    /**
     * Limit how many VoiceConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoiceConfig upsert
   */
  export type VoiceConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the VoiceConfig to update in case it exists.
     */
    where: VoiceConfigWhereUniqueInput
    /**
     * In case the VoiceConfig found by the `where` argument doesn't exist, create a new VoiceConfig with this data.
     */
    create: XOR<VoiceConfigCreateInput, VoiceConfigUncheckedCreateInput>
    /**
     * In case the VoiceConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoiceConfigUpdateInput, VoiceConfigUncheckedUpdateInput>
  }

  /**
   * VoiceConfig delete
   */
  export type VoiceConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
    /**
     * Filter which VoiceConfig to delete.
     */
    where: VoiceConfigWhereUniqueInput
  }

  /**
   * VoiceConfig deleteMany
   */
  export type VoiceConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceConfigs to delete
     */
    where?: VoiceConfigWhereInput
    /**
     * Limit how many VoiceConfigs to delete.
     */
    limit?: number
  }

  /**
   * VoiceConfig without action
   */
  export type VoiceConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceConfig
     */
    select?: VoiceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceConfig
     */
    omit?: VoiceConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceConfigInclude<ExtArgs> | null
  }


  /**
   * Model ClaudeConfig
   */

  export type AggregateClaudeConfig = {
    _count: ClaudeConfigCountAggregateOutputType | null
    _avg: ClaudeConfigAvgAggregateOutputType | null
    _sum: ClaudeConfigSumAggregateOutputType | null
    _min: ClaudeConfigMinAggregateOutputType | null
    _max: ClaudeConfigMaxAggregateOutputType | null
  }

  export type ClaudeConfigAvgAggregateOutputType = {
    maxTurns: number | null
  }

  export type ClaudeConfigSumAggregateOutputType = {
    maxTurns: number | null
  }

  export type ClaudeConfigMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    systemPromptTemplate: string | null
    voiceEnabled: boolean | null
    voiceDirectives: string | null
    model: string | null
    maxTurns: number | null
    permissionMode: string | null
    allowedTools: string | null
    disallowedTools: string | null
    mcpServers: string | null
    customInstructions: string | null
    templateVars: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClaudeConfigMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    systemPromptTemplate: string | null
    voiceEnabled: boolean | null
    voiceDirectives: string | null
    model: string | null
    maxTurns: number | null
    permissionMode: string | null
    allowedTools: string | null
    disallowedTools: string | null
    mcpServers: string | null
    customInstructions: string | null
    templateVars: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClaudeConfigCountAggregateOutputType = {
    id: number
    conversationId: number
    systemPromptTemplate: number
    voiceEnabled: number
    voiceDirectives: number
    model: number
    maxTurns: number
    permissionMode: number
    allowedTools: number
    disallowedTools: number
    mcpServers: number
    customInstructions: number
    templateVars: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClaudeConfigAvgAggregateInputType = {
    maxTurns?: true
  }

  export type ClaudeConfigSumAggregateInputType = {
    maxTurns?: true
  }

  export type ClaudeConfigMinAggregateInputType = {
    id?: true
    conversationId?: true
    systemPromptTemplate?: true
    voiceEnabled?: true
    voiceDirectives?: true
    model?: true
    maxTurns?: true
    permissionMode?: true
    allowedTools?: true
    disallowedTools?: true
    mcpServers?: true
    customInstructions?: true
    templateVars?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClaudeConfigMaxAggregateInputType = {
    id?: true
    conversationId?: true
    systemPromptTemplate?: true
    voiceEnabled?: true
    voiceDirectives?: true
    model?: true
    maxTurns?: true
    permissionMode?: true
    allowedTools?: true
    disallowedTools?: true
    mcpServers?: true
    customInstructions?: true
    templateVars?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClaudeConfigCountAggregateInputType = {
    id?: true
    conversationId?: true
    systemPromptTemplate?: true
    voiceEnabled?: true
    voiceDirectives?: true
    model?: true
    maxTurns?: true
    permissionMode?: true
    allowedTools?: true
    disallowedTools?: true
    mcpServers?: true
    customInstructions?: true
    templateVars?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClaudeConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaudeConfig to aggregate.
     */
    where?: ClaudeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaudeConfigs to fetch.
     */
    orderBy?: ClaudeConfigOrderByWithRelationInput | ClaudeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaudeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaudeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaudeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaudeConfigs
    **/
    _count?: true | ClaudeConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaudeConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaudeConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaudeConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaudeConfigMaxAggregateInputType
  }

  export type GetClaudeConfigAggregateType<T extends ClaudeConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateClaudeConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaudeConfig[P]>
      : GetScalarType<T[P], AggregateClaudeConfig[P]>
  }




  export type ClaudeConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaudeConfigWhereInput
    orderBy?: ClaudeConfigOrderByWithAggregationInput | ClaudeConfigOrderByWithAggregationInput[]
    by: ClaudeConfigScalarFieldEnum[] | ClaudeConfigScalarFieldEnum
    having?: ClaudeConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaudeConfigCountAggregateInputType | true
    _avg?: ClaudeConfigAvgAggregateInputType
    _sum?: ClaudeConfigSumAggregateInputType
    _min?: ClaudeConfigMinAggregateInputType
    _max?: ClaudeConfigMaxAggregateInputType
  }

  export type ClaudeConfigGroupByOutputType = {
    id: string
    conversationId: string
    systemPromptTemplate: string | null
    voiceEnabled: boolean
    voiceDirectives: string | null
    model: string
    maxTurns: number
    permissionMode: string
    allowedTools: string | null
    disallowedTools: string | null
    mcpServers: string | null
    customInstructions: string | null
    templateVars: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClaudeConfigCountAggregateOutputType | null
    _avg: ClaudeConfigAvgAggregateOutputType | null
    _sum: ClaudeConfigSumAggregateOutputType | null
    _min: ClaudeConfigMinAggregateOutputType | null
    _max: ClaudeConfigMaxAggregateOutputType | null
  }

  type GetClaudeConfigGroupByPayload<T extends ClaudeConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaudeConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaudeConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaudeConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ClaudeConfigGroupByOutputType[P]>
        }
      >
    >


  export type ClaudeConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    systemPromptTemplate?: boolean
    voiceEnabled?: boolean
    voiceDirectives?: boolean
    model?: boolean
    maxTurns?: boolean
    permissionMode?: boolean
    allowedTools?: boolean
    disallowedTools?: boolean
    mcpServers?: boolean
    customInstructions?: boolean
    templateVars?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claudeConfig"]>

  export type ClaudeConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    systemPromptTemplate?: boolean
    voiceEnabled?: boolean
    voiceDirectives?: boolean
    model?: boolean
    maxTurns?: boolean
    permissionMode?: boolean
    allowedTools?: boolean
    disallowedTools?: boolean
    mcpServers?: boolean
    customInstructions?: boolean
    templateVars?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claudeConfig"]>

  export type ClaudeConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    systemPromptTemplate?: boolean
    voiceEnabled?: boolean
    voiceDirectives?: boolean
    model?: boolean
    maxTurns?: boolean
    permissionMode?: boolean
    allowedTools?: boolean
    disallowedTools?: boolean
    mcpServers?: boolean
    customInstructions?: boolean
    templateVars?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claudeConfig"]>

  export type ClaudeConfigSelectScalar = {
    id?: boolean
    conversationId?: boolean
    systemPromptTemplate?: boolean
    voiceEnabled?: boolean
    voiceDirectives?: boolean
    model?: boolean
    maxTurns?: boolean
    permissionMode?: boolean
    allowedTools?: boolean
    disallowedTools?: boolean
    mcpServers?: boolean
    customInstructions?: boolean
    templateVars?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClaudeConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "systemPromptTemplate" | "voiceEnabled" | "voiceDirectives" | "model" | "maxTurns" | "permissionMode" | "allowedTools" | "disallowedTools" | "mcpServers" | "customInstructions" | "templateVars" | "createdAt" | "updatedAt", ExtArgs["result"]["claudeConfig"]>
  export type ClaudeConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ClaudeConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ClaudeConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $ClaudeConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaudeConfig"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      systemPromptTemplate: string | null
      voiceEnabled: boolean
      voiceDirectives: string | null
      model: string
      maxTurns: number
      permissionMode: string
      allowedTools: string | null
      disallowedTools: string | null
      mcpServers: string | null
      customInstructions: string | null
      templateVars: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["claudeConfig"]>
    composites: {}
  }

  type ClaudeConfigGetPayload<S extends boolean | null | undefined | ClaudeConfigDefaultArgs> = $Result.GetResult<Prisma.$ClaudeConfigPayload, S>

  type ClaudeConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaudeConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaudeConfigCountAggregateInputType | true
    }

  export interface ClaudeConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaudeConfig'], meta: { name: 'ClaudeConfig' } }
    /**
     * Find zero or one ClaudeConfig that matches the filter.
     * @param {ClaudeConfigFindUniqueArgs} args - Arguments to find a ClaudeConfig
     * @example
     * // Get one ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaudeConfigFindUniqueArgs>(args: SelectSubset<T, ClaudeConfigFindUniqueArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaudeConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaudeConfigFindUniqueOrThrowArgs} args - Arguments to find a ClaudeConfig
     * @example
     * // Get one ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaudeConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaudeConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaudeConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigFindFirstArgs} args - Arguments to find a ClaudeConfig
     * @example
     * // Get one ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaudeConfigFindFirstArgs>(args?: SelectSubset<T, ClaudeConfigFindFirstArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaudeConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigFindFirstOrThrowArgs} args - Arguments to find a ClaudeConfig
     * @example
     * // Get one ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaudeConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaudeConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaudeConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaudeConfigs
     * const claudeConfigs = await prisma.claudeConfig.findMany()
     * 
     * // Get first 10 ClaudeConfigs
     * const claudeConfigs = await prisma.claudeConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claudeConfigWithIdOnly = await prisma.claudeConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaudeConfigFindManyArgs>(args?: SelectSubset<T, ClaudeConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaudeConfig.
     * @param {ClaudeConfigCreateArgs} args - Arguments to create a ClaudeConfig.
     * @example
     * // Create one ClaudeConfig
     * const ClaudeConfig = await prisma.claudeConfig.create({
     *   data: {
     *     // ... data to create a ClaudeConfig
     *   }
     * })
     * 
     */
    create<T extends ClaudeConfigCreateArgs>(args: SelectSubset<T, ClaudeConfigCreateArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaudeConfigs.
     * @param {ClaudeConfigCreateManyArgs} args - Arguments to create many ClaudeConfigs.
     * @example
     * // Create many ClaudeConfigs
     * const claudeConfig = await prisma.claudeConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaudeConfigCreateManyArgs>(args?: SelectSubset<T, ClaudeConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaudeConfigs and returns the data saved in the database.
     * @param {ClaudeConfigCreateManyAndReturnArgs} args - Arguments to create many ClaudeConfigs.
     * @example
     * // Create many ClaudeConfigs
     * const claudeConfig = await prisma.claudeConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaudeConfigs and only return the `id`
     * const claudeConfigWithIdOnly = await prisma.claudeConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaudeConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaudeConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaudeConfig.
     * @param {ClaudeConfigDeleteArgs} args - Arguments to delete one ClaudeConfig.
     * @example
     * // Delete one ClaudeConfig
     * const ClaudeConfig = await prisma.claudeConfig.delete({
     *   where: {
     *     // ... filter to delete one ClaudeConfig
     *   }
     * })
     * 
     */
    delete<T extends ClaudeConfigDeleteArgs>(args: SelectSubset<T, ClaudeConfigDeleteArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaudeConfig.
     * @param {ClaudeConfigUpdateArgs} args - Arguments to update one ClaudeConfig.
     * @example
     * // Update one ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaudeConfigUpdateArgs>(args: SelectSubset<T, ClaudeConfigUpdateArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaudeConfigs.
     * @param {ClaudeConfigDeleteManyArgs} args - Arguments to filter ClaudeConfigs to delete.
     * @example
     * // Delete a few ClaudeConfigs
     * const { count } = await prisma.claudeConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaudeConfigDeleteManyArgs>(args?: SelectSubset<T, ClaudeConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaudeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaudeConfigs
     * const claudeConfig = await prisma.claudeConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaudeConfigUpdateManyArgs>(args: SelectSubset<T, ClaudeConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaudeConfigs and returns the data updated in the database.
     * @param {ClaudeConfigUpdateManyAndReturnArgs} args - Arguments to update many ClaudeConfigs.
     * @example
     * // Update many ClaudeConfigs
     * const claudeConfig = await prisma.claudeConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaudeConfigs and only return the `id`
     * const claudeConfigWithIdOnly = await prisma.claudeConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaudeConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaudeConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaudeConfig.
     * @param {ClaudeConfigUpsertArgs} args - Arguments to update or create a ClaudeConfig.
     * @example
     * // Update or create a ClaudeConfig
     * const claudeConfig = await prisma.claudeConfig.upsert({
     *   create: {
     *     // ... data to create a ClaudeConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaudeConfig we want to update
     *   }
     * })
     */
    upsert<T extends ClaudeConfigUpsertArgs>(args: SelectSubset<T, ClaudeConfigUpsertArgs<ExtArgs>>): Prisma__ClaudeConfigClient<$Result.GetResult<Prisma.$ClaudeConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaudeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigCountArgs} args - Arguments to filter ClaudeConfigs to count.
     * @example
     * // Count the number of ClaudeConfigs
     * const count = await prisma.claudeConfig.count({
     *   where: {
     *     // ... the filter for the ClaudeConfigs we want to count
     *   }
     * })
    **/
    count<T extends ClaudeConfigCountArgs>(
      args?: Subset<T, ClaudeConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaudeConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaudeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaudeConfigAggregateArgs>(args: Subset<T, ClaudeConfigAggregateArgs>): Prisma.PrismaPromise<GetClaudeConfigAggregateType<T>>

    /**
     * Group by ClaudeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaudeConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaudeConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaudeConfigGroupByArgs['orderBy'] }
        : { orderBy?: ClaudeConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaudeConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaudeConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaudeConfig model
   */
  readonly fields: ClaudeConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaudeConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaudeConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaudeConfig model
   */
  interface ClaudeConfigFieldRefs {
    readonly id: FieldRef<"ClaudeConfig", 'String'>
    readonly conversationId: FieldRef<"ClaudeConfig", 'String'>
    readonly systemPromptTemplate: FieldRef<"ClaudeConfig", 'String'>
    readonly voiceEnabled: FieldRef<"ClaudeConfig", 'Boolean'>
    readonly voiceDirectives: FieldRef<"ClaudeConfig", 'String'>
    readonly model: FieldRef<"ClaudeConfig", 'String'>
    readonly maxTurns: FieldRef<"ClaudeConfig", 'Int'>
    readonly permissionMode: FieldRef<"ClaudeConfig", 'String'>
    readonly allowedTools: FieldRef<"ClaudeConfig", 'String'>
    readonly disallowedTools: FieldRef<"ClaudeConfig", 'String'>
    readonly mcpServers: FieldRef<"ClaudeConfig", 'String'>
    readonly customInstructions: FieldRef<"ClaudeConfig", 'String'>
    readonly templateVars: FieldRef<"ClaudeConfig", 'String'>
    readonly createdAt: FieldRef<"ClaudeConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"ClaudeConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaudeConfig findUnique
   */
  export type ClaudeConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter, which ClaudeConfig to fetch.
     */
    where: ClaudeConfigWhereUniqueInput
  }

  /**
   * ClaudeConfig findUniqueOrThrow
   */
  export type ClaudeConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter, which ClaudeConfig to fetch.
     */
    where: ClaudeConfigWhereUniqueInput
  }

  /**
   * ClaudeConfig findFirst
   */
  export type ClaudeConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter, which ClaudeConfig to fetch.
     */
    where?: ClaudeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaudeConfigs to fetch.
     */
    orderBy?: ClaudeConfigOrderByWithRelationInput | ClaudeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaudeConfigs.
     */
    cursor?: ClaudeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaudeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaudeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaudeConfigs.
     */
    distinct?: ClaudeConfigScalarFieldEnum | ClaudeConfigScalarFieldEnum[]
  }

  /**
   * ClaudeConfig findFirstOrThrow
   */
  export type ClaudeConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter, which ClaudeConfig to fetch.
     */
    where?: ClaudeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaudeConfigs to fetch.
     */
    orderBy?: ClaudeConfigOrderByWithRelationInput | ClaudeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaudeConfigs.
     */
    cursor?: ClaudeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaudeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaudeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaudeConfigs.
     */
    distinct?: ClaudeConfigScalarFieldEnum | ClaudeConfigScalarFieldEnum[]
  }

  /**
   * ClaudeConfig findMany
   */
  export type ClaudeConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter, which ClaudeConfigs to fetch.
     */
    where?: ClaudeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaudeConfigs to fetch.
     */
    orderBy?: ClaudeConfigOrderByWithRelationInput | ClaudeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaudeConfigs.
     */
    cursor?: ClaudeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaudeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaudeConfigs.
     */
    skip?: number
    distinct?: ClaudeConfigScalarFieldEnum | ClaudeConfigScalarFieldEnum[]
  }

  /**
   * ClaudeConfig create
   */
  export type ClaudeConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaudeConfig.
     */
    data: XOR<ClaudeConfigCreateInput, ClaudeConfigUncheckedCreateInput>
  }

  /**
   * ClaudeConfig createMany
   */
  export type ClaudeConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaudeConfigs.
     */
    data: ClaudeConfigCreateManyInput | ClaudeConfigCreateManyInput[]
  }

  /**
   * ClaudeConfig createManyAndReturn
   */
  export type ClaudeConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * The data used to create many ClaudeConfigs.
     */
    data: ClaudeConfigCreateManyInput | ClaudeConfigCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaudeConfig update
   */
  export type ClaudeConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaudeConfig.
     */
    data: XOR<ClaudeConfigUpdateInput, ClaudeConfigUncheckedUpdateInput>
    /**
     * Choose, which ClaudeConfig to update.
     */
    where: ClaudeConfigWhereUniqueInput
  }

  /**
   * ClaudeConfig updateMany
   */
  export type ClaudeConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaudeConfigs.
     */
    data: XOR<ClaudeConfigUpdateManyMutationInput, ClaudeConfigUncheckedUpdateManyInput>
    /**
     * Filter which ClaudeConfigs to update
     */
    where?: ClaudeConfigWhereInput
    /**
     * Limit how many ClaudeConfigs to update.
     */
    limit?: number
  }

  /**
   * ClaudeConfig updateManyAndReturn
   */
  export type ClaudeConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * The data used to update ClaudeConfigs.
     */
    data: XOR<ClaudeConfigUpdateManyMutationInput, ClaudeConfigUncheckedUpdateManyInput>
    /**
     * Filter which ClaudeConfigs to update
     */
    where?: ClaudeConfigWhereInput
    /**
     * Limit how many ClaudeConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaudeConfig upsert
   */
  export type ClaudeConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaudeConfig to update in case it exists.
     */
    where: ClaudeConfigWhereUniqueInput
    /**
     * In case the ClaudeConfig found by the `where` argument doesn't exist, create a new ClaudeConfig with this data.
     */
    create: XOR<ClaudeConfigCreateInput, ClaudeConfigUncheckedCreateInput>
    /**
     * In case the ClaudeConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaudeConfigUpdateInput, ClaudeConfigUncheckedUpdateInput>
  }

  /**
   * ClaudeConfig delete
   */
  export type ClaudeConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
    /**
     * Filter which ClaudeConfig to delete.
     */
    where: ClaudeConfigWhereUniqueInput
  }

  /**
   * ClaudeConfig deleteMany
   */
  export type ClaudeConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaudeConfigs to delete
     */
    where?: ClaudeConfigWhereInput
    /**
     * Limit how many ClaudeConfigs to delete.
     */
    limit?: number
  }

  /**
   * ClaudeConfig without action
   */
  export type ClaudeConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaudeConfig
     */
    select?: ClaudeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaudeConfig
     */
    omit?: ClaudeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaudeConfigInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsAvgAggregateOutputType = {
    id: number | null
    sampleRate: number | null
    vadThreshold: number | null
    minSilenceMs: number | null
    maxUtteranceMs: number | null
    minSpeechMs: number | null
    maxChunkLengthMs: number | null
    ssmlMaxBreaksPer100Words: number | null
    retentionDays: number | null
  }

  export type SettingsSumAggregateOutputType = {
    id: number | null
    sampleRate: number | null
    vadThreshold: number | null
    minSilenceMs: number | null
    maxUtteranceMs: number | null
    minSpeechMs: number | null
    maxChunkLengthMs: number | null
    ssmlMaxBreaksPer100Words: number | null
    retentionDays: number | null
  }

  export type SettingsMinAggregateOutputType = {
    id: number | null
    inputDeviceId: string | null
    sampleRate: number | null
    noiseSuppressionEnabled: boolean | null
    vadThreshold: number | null
    minSilenceMs: number | null
    maxUtteranceMs: number | null
    minSpeechMs: number | null
    trimLongSilences: boolean | null
    maxChunkLengthMs: number | null
    sttProvider: string | null
    sttModel: string | null
    sttLocale: string | null
    sttEncoding: string | null
    sendPartials: boolean | null
    ttsProvider: string | null
    ttsVoiceId: string | null
    ttsModel: string | null
    ttsStreamPlayback: boolean | null
    ttsAutoplay: boolean | null
    ssmlEnabled: boolean | null
    ssmlModel: string | null
    ssmlEnableProsody: boolean | null
    ssmlEnableEmphasis: boolean | null
    ssmlEnablePhonemes: boolean | null
    ssmlFormality: string | null
    ssmlMaxBreaksPer100Words: number | null
    defaultMode: string | null
    autoSendInAutoMode: boolean | null
    pttKeybinding: string | null
    keepConversationHistory: boolean | null
    retentionDays: number | null
    loggingLevel: string | null
    metricsEnabled: boolean | null
    backendUrl: string | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: number | null
    inputDeviceId: string | null
    sampleRate: number | null
    noiseSuppressionEnabled: boolean | null
    vadThreshold: number | null
    minSilenceMs: number | null
    maxUtteranceMs: number | null
    minSpeechMs: number | null
    trimLongSilences: boolean | null
    maxChunkLengthMs: number | null
    sttProvider: string | null
    sttModel: string | null
    sttLocale: string | null
    sttEncoding: string | null
    sendPartials: boolean | null
    ttsProvider: string | null
    ttsVoiceId: string | null
    ttsModel: string | null
    ttsStreamPlayback: boolean | null
    ttsAutoplay: boolean | null
    ssmlEnabled: boolean | null
    ssmlModel: string | null
    ssmlEnableProsody: boolean | null
    ssmlEnableEmphasis: boolean | null
    ssmlEnablePhonemes: boolean | null
    ssmlFormality: string | null
    ssmlMaxBreaksPer100Words: number | null
    defaultMode: string | null
    autoSendInAutoMode: boolean | null
    pttKeybinding: string | null
    keepConversationHistory: boolean | null
    retentionDays: number | null
    loggingLevel: string | null
    metricsEnabled: boolean | null
    backendUrl: string | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    inputDeviceId: number
    sampleRate: number
    noiseSuppressionEnabled: number
    vadThreshold: number
    minSilenceMs: number
    maxUtteranceMs: number
    minSpeechMs: number
    trimLongSilences: number
    maxChunkLengthMs: number
    sttProvider: number
    sttModel: number
    sttLocale: number
    sttEncoding: number
    sendPartials: number
    ttsProvider: number
    ttsVoiceId: number
    ttsModel: number
    ttsStreamPlayback: number
    ttsAutoplay: number
    ssmlEnabled: number
    ssmlModel: number
    ssmlEnableProsody: number
    ssmlEnableEmphasis: number
    ssmlEnablePhonemes: number
    ssmlFormality: number
    ssmlMaxBreaksPer100Words: number
    defaultMode: number
    autoSendInAutoMode: number
    pttKeybinding: number
    keepConversationHistory: number
    retentionDays: number
    loggingLevel: number
    metricsEnabled: number
    backendUrl: number
    updatedAt: number
    _all: number
  }


  export type SettingsAvgAggregateInputType = {
    id?: true
    sampleRate?: true
    vadThreshold?: true
    minSilenceMs?: true
    maxUtteranceMs?: true
    minSpeechMs?: true
    maxChunkLengthMs?: true
    ssmlMaxBreaksPer100Words?: true
    retentionDays?: true
  }

  export type SettingsSumAggregateInputType = {
    id?: true
    sampleRate?: true
    vadThreshold?: true
    minSilenceMs?: true
    maxUtteranceMs?: true
    minSpeechMs?: true
    maxChunkLengthMs?: true
    ssmlMaxBreaksPer100Words?: true
    retentionDays?: true
  }

  export type SettingsMinAggregateInputType = {
    id?: true
    inputDeviceId?: true
    sampleRate?: true
    noiseSuppressionEnabled?: true
    vadThreshold?: true
    minSilenceMs?: true
    maxUtteranceMs?: true
    minSpeechMs?: true
    trimLongSilences?: true
    maxChunkLengthMs?: true
    sttProvider?: true
    sttModel?: true
    sttLocale?: true
    sttEncoding?: true
    sendPartials?: true
    ttsProvider?: true
    ttsVoiceId?: true
    ttsModel?: true
    ttsStreamPlayback?: true
    ttsAutoplay?: true
    ssmlEnabled?: true
    ssmlModel?: true
    ssmlEnableProsody?: true
    ssmlEnableEmphasis?: true
    ssmlEnablePhonemes?: true
    ssmlFormality?: true
    ssmlMaxBreaksPer100Words?: true
    defaultMode?: true
    autoSendInAutoMode?: true
    pttKeybinding?: true
    keepConversationHistory?: true
    retentionDays?: true
    loggingLevel?: true
    metricsEnabled?: true
    backendUrl?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    inputDeviceId?: true
    sampleRate?: true
    noiseSuppressionEnabled?: true
    vadThreshold?: true
    minSilenceMs?: true
    maxUtteranceMs?: true
    minSpeechMs?: true
    trimLongSilences?: true
    maxChunkLengthMs?: true
    sttProvider?: true
    sttModel?: true
    sttLocale?: true
    sttEncoding?: true
    sendPartials?: true
    ttsProvider?: true
    ttsVoiceId?: true
    ttsModel?: true
    ttsStreamPlayback?: true
    ttsAutoplay?: true
    ssmlEnabled?: true
    ssmlModel?: true
    ssmlEnableProsody?: true
    ssmlEnableEmphasis?: true
    ssmlEnablePhonemes?: true
    ssmlFormality?: true
    ssmlMaxBreaksPer100Words?: true
    defaultMode?: true
    autoSendInAutoMode?: true
    pttKeybinding?: true
    keepConversationHistory?: true
    retentionDays?: true
    loggingLevel?: true
    metricsEnabled?: true
    backendUrl?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    inputDeviceId?: true
    sampleRate?: true
    noiseSuppressionEnabled?: true
    vadThreshold?: true
    minSilenceMs?: true
    maxUtteranceMs?: true
    minSpeechMs?: true
    trimLongSilences?: true
    maxChunkLengthMs?: true
    sttProvider?: true
    sttModel?: true
    sttLocale?: true
    sttEncoding?: true
    sendPartials?: true
    ttsProvider?: true
    ttsVoiceId?: true
    ttsModel?: true
    ttsStreamPlayback?: true
    ttsAutoplay?: true
    ssmlEnabled?: true
    ssmlModel?: true
    ssmlEnableProsody?: true
    ssmlEnableEmphasis?: true
    ssmlEnablePhonemes?: true
    ssmlFormality?: true
    ssmlMaxBreaksPer100Words?: true
    defaultMode?: true
    autoSendInAutoMode?: true
    pttKeybinding?: true
    keepConversationHistory?: true
    retentionDays?: true
    loggingLevel?: true
    metricsEnabled?: true
    backendUrl?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _avg?: SettingsAvgAggregateInputType
    _sum?: SettingsSumAggregateInputType
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: number
    inputDeviceId: string | null
    sampleRate: number
    noiseSuppressionEnabled: boolean
    vadThreshold: number
    minSilenceMs: number
    maxUtteranceMs: number
    minSpeechMs: number
    trimLongSilences: boolean
    maxChunkLengthMs: number
    sttProvider: string
    sttModel: string
    sttLocale: string
    sttEncoding: string
    sendPartials: boolean
    ttsProvider: string
    ttsVoiceId: string | null
    ttsModel: string
    ttsStreamPlayback: boolean
    ttsAutoplay: boolean
    ssmlEnabled: boolean
    ssmlModel: string
    ssmlEnableProsody: boolean
    ssmlEnableEmphasis: boolean
    ssmlEnablePhonemes: boolean
    ssmlFormality: string
    ssmlMaxBreaksPer100Words: number
    defaultMode: string
    autoSendInAutoMode: boolean
    pttKeybinding: string
    keepConversationHistory: boolean
    retentionDays: number
    loggingLevel: string
    metricsEnabled: boolean
    backendUrl: string
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inputDeviceId?: boolean
    sampleRate?: boolean
    noiseSuppressionEnabled?: boolean
    vadThreshold?: boolean
    minSilenceMs?: boolean
    maxUtteranceMs?: boolean
    minSpeechMs?: boolean
    trimLongSilences?: boolean
    maxChunkLengthMs?: boolean
    sttProvider?: boolean
    sttModel?: boolean
    sttLocale?: boolean
    sttEncoding?: boolean
    sendPartials?: boolean
    ttsProvider?: boolean
    ttsVoiceId?: boolean
    ttsModel?: boolean
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: boolean
    ssmlMaxBreaksPer100Words?: boolean
    defaultMode?: boolean
    autoSendInAutoMode?: boolean
    pttKeybinding?: boolean
    keepConversationHistory?: boolean
    retentionDays?: boolean
    loggingLevel?: boolean
    metricsEnabled?: boolean
    backendUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inputDeviceId?: boolean
    sampleRate?: boolean
    noiseSuppressionEnabled?: boolean
    vadThreshold?: boolean
    minSilenceMs?: boolean
    maxUtteranceMs?: boolean
    minSpeechMs?: boolean
    trimLongSilences?: boolean
    maxChunkLengthMs?: boolean
    sttProvider?: boolean
    sttModel?: boolean
    sttLocale?: boolean
    sttEncoding?: boolean
    sendPartials?: boolean
    ttsProvider?: boolean
    ttsVoiceId?: boolean
    ttsModel?: boolean
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: boolean
    ssmlMaxBreaksPer100Words?: boolean
    defaultMode?: boolean
    autoSendInAutoMode?: boolean
    pttKeybinding?: boolean
    keepConversationHistory?: boolean
    retentionDays?: boolean
    loggingLevel?: boolean
    metricsEnabled?: boolean
    backendUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inputDeviceId?: boolean
    sampleRate?: boolean
    noiseSuppressionEnabled?: boolean
    vadThreshold?: boolean
    minSilenceMs?: boolean
    maxUtteranceMs?: boolean
    minSpeechMs?: boolean
    trimLongSilences?: boolean
    maxChunkLengthMs?: boolean
    sttProvider?: boolean
    sttModel?: boolean
    sttLocale?: boolean
    sttEncoding?: boolean
    sendPartials?: boolean
    ttsProvider?: boolean
    ttsVoiceId?: boolean
    ttsModel?: boolean
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: boolean
    ssmlMaxBreaksPer100Words?: boolean
    defaultMode?: boolean
    autoSendInAutoMode?: boolean
    pttKeybinding?: boolean
    keepConversationHistory?: boolean
    retentionDays?: boolean
    loggingLevel?: boolean
    metricsEnabled?: boolean
    backendUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    inputDeviceId?: boolean
    sampleRate?: boolean
    noiseSuppressionEnabled?: boolean
    vadThreshold?: boolean
    minSilenceMs?: boolean
    maxUtteranceMs?: boolean
    minSpeechMs?: boolean
    trimLongSilences?: boolean
    maxChunkLengthMs?: boolean
    sttProvider?: boolean
    sttModel?: boolean
    sttLocale?: boolean
    sttEncoding?: boolean
    sendPartials?: boolean
    ttsProvider?: boolean
    ttsVoiceId?: boolean
    ttsModel?: boolean
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: boolean
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: boolean
    ssmlMaxBreaksPer100Words?: boolean
    defaultMode?: boolean
    autoSendInAutoMode?: boolean
    pttKeybinding?: boolean
    keepConversationHistory?: boolean
    retentionDays?: boolean
    loggingLevel?: boolean
    metricsEnabled?: boolean
    backendUrl?: boolean
    updatedAt?: boolean
  }

  export type SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inputDeviceId" | "sampleRate" | "noiseSuppressionEnabled" | "vadThreshold" | "minSilenceMs" | "maxUtteranceMs" | "minSpeechMs" | "trimLongSilences" | "maxChunkLengthMs" | "sttProvider" | "sttModel" | "sttLocale" | "sttEncoding" | "sendPartials" | "ttsProvider" | "ttsVoiceId" | "ttsModel" | "ttsStreamPlayback" | "ttsAutoplay" | "ssmlEnabled" | "ssmlModel" | "ssmlEnableProsody" | "ssmlEnableEmphasis" | "ssmlEnablePhonemes" | "ssmlFormality" | "ssmlMaxBreaksPer100Words" | "defaultMode" | "autoSendInAutoMode" | "pttKeybinding" | "keepConversationHistory" | "retentionDays" | "loggingLevel" | "metricsEnabled" | "backendUrl" | "updatedAt", ExtArgs["result"]["settings"]>

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      inputDeviceId: string | null
      sampleRate: number
      noiseSuppressionEnabled: boolean
      vadThreshold: number
      minSilenceMs: number
      maxUtteranceMs: number
      minSpeechMs: number
      trimLongSilences: boolean
      maxChunkLengthMs: number
      sttProvider: string
      sttModel: string
      sttLocale: string
      sttEncoding: string
      sendPartials: boolean
      ttsProvider: string
      ttsVoiceId: string | null
      ttsModel: string
      ttsStreamPlayback: boolean
      ttsAutoplay: boolean
      ssmlEnabled: boolean
      ssmlModel: string
      ssmlEnableProsody: boolean
      ssmlEnableEmphasis: boolean
      ssmlEnablePhonemes: boolean
      ssmlFormality: string
      ssmlMaxBreaksPer100Words: number
      defaultMode: string
      autoSendInAutoMode: boolean
      pttKeybinding: string
      keepConversationHistory: boolean
      retentionDays: number
      loggingLevel: string
      metricsEnabled: boolean
      backendUrl: string
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingsUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'Int'>
    readonly inputDeviceId: FieldRef<"Settings", 'String'>
    readonly sampleRate: FieldRef<"Settings", 'Int'>
    readonly noiseSuppressionEnabled: FieldRef<"Settings", 'Boolean'>
    readonly vadThreshold: FieldRef<"Settings", 'Float'>
    readonly minSilenceMs: FieldRef<"Settings", 'Int'>
    readonly maxUtteranceMs: FieldRef<"Settings", 'Int'>
    readonly minSpeechMs: FieldRef<"Settings", 'Int'>
    readonly trimLongSilences: FieldRef<"Settings", 'Boolean'>
    readonly maxChunkLengthMs: FieldRef<"Settings", 'Int'>
    readonly sttProvider: FieldRef<"Settings", 'String'>
    readonly sttModel: FieldRef<"Settings", 'String'>
    readonly sttLocale: FieldRef<"Settings", 'String'>
    readonly sttEncoding: FieldRef<"Settings", 'String'>
    readonly sendPartials: FieldRef<"Settings", 'Boolean'>
    readonly ttsProvider: FieldRef<"Settings", 'String'>
    readonly ttsVoiceId: FieldRef<"Settings", 'String'>
    readonly ttsModel: FieldRef<"Settings", 'String'>
    readonly ttsStreamPlayback: FieldRef<"Settings", 'Boolean'>
    readonly ttsAutoplay: FieldRef<"Settings", 'Boolean'>
    readonly ssmlEnabled: FieldRef<"Settings", 'Boolean'>
    readonly ssmlModel: FieldRef<"Settings", 'String'>
    readonly ssmlEnableProsody: FieldRef<"Settings", 'Boolean'>
    readonly ssmlEnableEmphasis: FieldRef<"Settings", 'Boolean'>
    readonly ssmlEnablePhonemes: FieldRef<"Settings", 'Boolean'>
    readonly ssmlFormality: FieldRef<"Settings", 'String'>
    readonly ssmlMaxBreaksPer100Words: FieldRef<"Settings", 'Int'>
    readonly defaultMode: FieldRef<"Settings", 'String'>
    readonly autoSendInAutoMode: FieldRef<"Settings", 'Boolean'>
    readonly pttKeybinding: FieldRef<"Settings", 'String'>
    readonly keepConversationHistory: FieldRef<"Settings", 'Boolean'>
    readonly retentionDays: FieldRef<"Settings", 'Int'>
    readonly loggingLevel: FieldRef<"Settings", 'String'>
    readonly metricsEnabled: FieldRef<"Settings", 'Boolean'>
    readonly backendUrl: FieldRef<"Settings", 'String'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings updateManyAndReturn
   */
  export type SettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
  }


  /**
   * Model ProjectContext
   */

  export type AggregateProjectContext = {
    _count: ProjectContextCountAggregateOutputType | null
    _min: ProjectContextMinAggregateOutputType | null
    _max: ProjectContextMaxAggregateOutputType | null
  }

  export type ProjectContextMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    projectPath: string | null
    projectName: string | null
    claudeMdPath: string | null
    devCommand: string | null
    buildCommand: string | null
    testCommand: string | null
    stopCommand: string | null
    settings: string | null
    createdAt: Date | null
    lastAccessedAt: Date | null
  }

  export type ProjectContextMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    projectPath: string | null
    projectName: string | null
    claudeMdPath: string | null
    devCommand: string | null
    buildCommand: string | null
    testCommand: string | null
    stopCommand: string | null
    settings: string | null
    createdAt: Date | null
    lastAccessedAt: Date | null
  }

  export type ProjectContextCountAggregateOutputType = {
    id: number
    conversationId: number
    projectPath: number
    projectName: number
    claudeMdPath: number
    devCommand: number
    buildCommand: number
    testCommand: number
    stopCommand: number
    settings: number
    createdAt: number
    lastAccessedAt: number
    _all: number
  }


  export type ProjectContextMinAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    projectName?: true
    claudeMdPath?: true
    devCommand?: true
    buildCommand?: true
    testCommand?: true
    stopCommand?: true
    settings?: true
    createdAt?: true
    lastAccessedAt?: true
  }

  export type ProjectContextMaxAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    projectName?: true
    claudeMdPath?: true
    devCommand?: true
    buildCommand?: true
    testCommand?: true
    stopCommand?: true
    settings?: true
    createdAt?: true
    lastAccessedAt?: true
  }

  export type ProjectContextCountAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    projectName?: true
    claudeMdPath?: true
    devCommand?: true
    buildCommand?: true
    testCommand?: true
    stopCommand?: true
    settings?: true
    createdAt?: true
    lastAccessedAt?: true
    _all?: true
  }

  export type ProjectContextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectContext to aggregate.
     */
    where?: ProjectContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContexts to fetch.
     */
    orderBy?: ProjectContextOrderByWithRelationInput | ProjectContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectContexts
    **/
    _count?: true | ProjectContextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectContextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectContextMaxAggregateInputType
  }

  export type GetProjectContextAggregateType<T extends ProjectContextAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectContext]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectContext[P]>
      : GetScalarType<T[P], AggregateProjectContext[P]>
  }




  export type ProjectContextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectContextWhereInput
    orderBy?: ProjectContextOrderByWithAggregationInput | ProjectContextOrderByWithAggregationInput[]
    by: ProjectContextScalarFieldEnum[] | ProjectContextScalarFieldEnum
    having?: ProjectContextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectContextCountAggregateInputType | true
    _min?: ProjectContextMinAggregateInputType
    _max?: ProjectContextMaxAggregateInputType
  }

  export type ProjectContextGroupByOutputType = {
    id: string
    conversationId: string
    projectPath: string
    projectName: string
    claudeMdPath: string | null
    devCommand: string | null
    buildCommand: string | null
    testCommand: string | null
    stopCommand: string | null
    settings: string | null
    createdAt: Date
    lastAccessedAt: Date
    _count: ProjectContextCountAggregateOutputType | null
    _min: ProjectContextMinAggregateOutputType | null
    _max: ProjectContextMaxAggregateOutputType | null
  }

  type GetProjectContextGroupByPayload<T extends ProjectContextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectContextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectContextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectContextGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectContextGroupByOutputType[P]>
        }
      >
    >


  export type ProjectContextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    projectName?: boolean
    claudeMdPath?: boolean
    devCommand?: boolean
    buildCommand?: boolean
    testCommand?: boolean
    stopCommand?: boolean
    settings?: boolean
    createdAt?: boolean
    lastAccessedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContext"]>

  export type ProjectContextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    projectName?: boolean
    claudeMdPath?: boolean
    devCommand?: boolean
    buildCommand?: boolean
    testCommand?: boolean
    stopCommand?: boolean
    settings?: boolean
    createdAt?: boolean
    lastAccessedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContext"]>

  export type ProjectContextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    projectName?: boolean
    claudeMdPath?: boolean
    devCommand?: boolean
    buildCommand?: boolean
    testCommand?: boolean
    stopCommand?: boolean
    settings?: boolean
    createdAt?: boolean
    lastAccessedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContext"]>

  export type ProjectContextSelectScalar = {
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    projectName?: boolean
    claudeMdPath?: boolean
    devCommand?: boolean
    buildCommand?: boolean
    testCommand?: boolean
    stopCommand?: boolean
    settings?: boolean
    createdAt?: boolean
    lastAccessedAt?: boolean
  }

  export type ProjectContextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "projectPath" | "projectName" | "claudeMdPath" | "devCommand" | "buildCommand" | "testCommand" | "stopCommand" | "settings" | "createdAt" | "lastAccessedAt", ExtArgs["result"]["projectContext"]>
  export type ProjectContextInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ProjectContextIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ProjectContextIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $ProjectContextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectContext"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      projectPath: string
      projectName: string
      claudeMdPath: string | null
      devCommand: string | null
      buildCommand: string | null
      testCommand: string | null
      stopCommand: string | null
      settings: string | null
      createdAt: Date
      lastAccessedAt: Date
    }, ExtArgs["result"]["projectContext"]>
    composites: {}
  }

  type ProjectContextGetPayload<S extends boolean | null | undefined | ProjectContextDefaultArgs> = $Result.GetResult<Prisma.$ProjectContextPayload, S>

  type ProjectContextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectContextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectContextCountAggregateInputType | true
    }

  export interface ProjectContextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectContext'], meta: { name: 'ProjectContext' } }
    /**
     * Find zero or one ProjectContext that matches the filter.
     * @param {ProjectContextFindUniqueArgs} args - Arguments to find a ProjectContext
     * @example
     * // Get one ProjectContext
     * const projectContext = await prisma.projectContext.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectContextFindUniqueArgs>(args: SelectSubset<T, ProjectContextFindUniqueArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectContext that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectContextFindUniqueOrThrowArgs} args - Arguments to find a ProjectContext
     * @example
     * // Get one ProjectContext
     * const projectContext = await prisma.projectContext.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectContextFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectContextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectContext that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextFindFirstArgs} args - Arguments to find a ProjectContext
     * @example
     * // Get one ProjectContext
     * const projectContext = await prisma.projectContext.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectContextFindFirstArgs>(args?: SelectSubset<T, ProjectContextFindFirstArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectContext that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextFindFirstOrThrowArgs} args - Arguments to find a ProjectContext
     * @example
     * // Get one ProjectContext
     * const projectContext = await prisma.projectContext.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectContextFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectContextFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectContexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectContexts
     * const projectContexts = await prisma.projectContext.findMany()
     * 
     * // Get first 10 ProjectContexts
     * const projectContexts = await prisma.projectContext.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectContextWithIdOnly = await prisma.projectContext.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectContextFindManyArgs>(args?: SelectSubset<T, ProjectContextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectContext.
     * @param {ProjectContextCreateArgs} args - Arguments to create a ProjectContext.
     * @example
     * // Create one ProjectContext
     * const ProjectContext = await prisma.projectContext.create({
     *   data: {
     *     // ... data to create a ProjectContext
     *   }
     * })
     * 
     */
    create<T extends ProjectContextCreateArgs>(args: SelectSubset<T, ProjectContextCreateArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectContexts.
     * @param {ProjectContextCreateManyArgs} args - Arguments to create many ProjectContexts.
     * @example
     * // Create many ProjectContexts
     * const projectContext = await prisma.projectContext.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectContextCreateManyArgs>(args?: SelectSubset<T, ProjectContextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectContexts and returns the data saved in the database.
     * @param {ProjectContextCreateManyAndReturnArgs} args - Arguments to create many ProjectContexts.
     * @example
     * // Create many ProjectContexts
     * const projectContext = await prisma.projectContext.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectContexts and only return the `id`
     * const projectContextWithIdOnly = await prisma.projectContext.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectContextCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectContextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectContext.
     * @param {ProjectContextDeleteArgs} args - Arguments to delete one ProjectContext.
     * @example
     * // Delete one ProjectContext
     * const ProjectContext = await prisma.projectContext.delete({
     *   where: {
     *     // ... filter to delete one ProjectContext
     *   }
     * })
     * 
     */
    delete<T extends ProjectContextDeleteArgs>(args: SelectSubset<T, ProjectContextDeleteArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectContext.
     * @param {ProjectContextUpdateArgs} args - Arguments to update one ProjectContext.
     * @example
     * // Update one ProjectContext
     * const projectContext = await prisma.projectContext.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectContextUpdateArgs>(args: SelectSubset<T, ProjectContextUpdateArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectContexts.
     * @param {ProjectContextDeleteManyArgs} args - Arguments to filter ProjectContexts to delete.
     * @example
     * // Delete a few ProjectContexts
     * const { count } = await prisma.projectContext.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectContextDeleteManyArgs>(args?: SelectSubset<T, ProjectContextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectContexts
     * const projectContext = await prisma.projectContext.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectContextUpdateManyArgs>(args: SelectSubset<T, ProjectContextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectContexts and returns the data updated in the database.
     * @param {ProjectContextUpdateManyAndReturnArgs} args - Arguments to update many ProjectContexts.
     * @example
     * // Update many ProjectContexts
     * const projectContext = await prisma.projectContext.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectContexts and only return the `id`
     * const projectContextWithIdOnly = await prisma.projectContext.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectContextUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectContextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectContext.
     * @param {ProjectContextUpsertArgs} args - Arguments to update or create a ProjectContext.
     * @example
     * // Update or create a ProjectContext
     * const projectContext = await prisma.projectContext.upsert({
     *   create: {
     *     // ... data to create a ProjectContext
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectContext we want to update
     *   }
     * })
     */
    upsert<T extends ProjectContextUpsertArgs>(args: SelectSubset<T, ProjectContextUpsertArgs<ExtArgs>>): Prisma__ProjectContextClient<$Result.GetResult<Prisma.$ProjectContextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextCountArgs} args - Arguments to filter ProjectContexts to count.
     * @example
     * // Count the number of ProjectContexts
     * const count = await prisma.projectContext.count({
     *   where: {
     *     // ... the filter for the ProjectContexts we want to count
     *   }
     * })
    **/
    count<T extends ProjectContextCountArgs>(
      args?: Subset<T, ProjectContextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectContextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectContextAggregateArgs>(args: Subset<T, ProjectContextAggregateArgs>): Prisma.PrismaPromise<GetProjectContextAggregateType<T>>

    /**
     * Group by ProjectContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContextGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectContextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectContextGroupByArgs['orderBy'] }
        : { orderBy?: ProjectContextGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectContextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectContextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectContext model
   */
  readonly fields: ProjectContextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectContext.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectContextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectContext model
   */
  interface ProjectContextFieldRefs {
    readonly id: FieldRef<"ProjectContext", 'String'>
    readonly conversationId: FieldRef<"ProjectContext", 'String'>
    readonly projectPath: FieldRef<"ProjectContext", 'String'>
    readonly projectName: FieldRef<"ProjectContext", 'String'>
    readonly claudeMdPath: FieldRef<"ProjectContext", 'String'>
    readonly devCommand: FieldRef<"ProjectContext", 'String'>
    readonly buildCommand: FieldRef<"ProjectContext", 'String'>
    readonly testCommand: FieldRef<"ProjectContext", 'String'>
    readonly stopCommand: FieldRef<"ProjectContext", 'String'>
    readonly settings: FieldRef<"ProjectContext", 'String'>
    readonly createdAt: FieldRef<"ProjectContext", 'DateTime'>
    readonly lastAccessedAt: FieldRef<"ProjectContext", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectContext findUnique
   */
  export type ProjectContextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContext to fetch.
     */
    where: ProjectContextWhereUniqueInput
  }

  /**
   * ProjectContext findUniqueOrThrow
   */
  export type ProjectContextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContext to fetch.
     */
    where: ProjectContextWhereUniqueInput
  }

  /**
   * ProjectContext findFirst
   */
  export type ProjectContextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContext to fetch.
     */
    where?: ProjectContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContexts to fetch.
     */
    orderBy?: ProjectContextOrderByWithRelationInput | ProjectContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectContexts.
     */
    cursor?: ProjectContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectContexts.
     */
    distinct?: ProjectContextScalarFieldEnum | ProjectContextScalarFieldEnum[]
  }

  /**
   * ProjectContext findFirstOrThrow
   */
  export type ProjectContextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContext to fetch.
     */
    where?: ProjectContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContexts to fetch.
     */
    orderBy?: ProjectContextOrderByWithRelationInput | ProjectContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectContexts.
     */
    cursor?: ProjectContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectContexts.
     */
    distinct?: ProjectContextScalarFieldEnum | ProjectContextScalarFieldEnum[]
  }

  /**
   * ProjectContext findMany
   */
  export type ProjectContextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContexts to fetch.
     */
    where?: ProjectContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContexts to fetch.
     */
    orderBy?: ProjectContextOrderByWithRelationInput | ProjectContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectContexts.
     */
    cursor?: ProjectContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContexts.
     */
    skip?: number
    distinct?: ProjectContextScalarFieldEnum | ProjectContextScalarFieldEnum[]
  }

  /**
   * ProjectContext create
   */
  export type ProjectContextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectContext.
     */
    data: XOR<ProjectContextCreateInput, ProjectContextUncheckedCreateInput>
  }

  /**
   * ProjectContext createMany
   */
  export type ProjectContextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectContexts.
     */
    data: ProjectContextCreateManyInput | ProjectContextCreateManyInput[]
  }

  /**
   * ProjectContext createManyAndReturn
   */
  export type ProjectContextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectContexts.
     */
    data: ProjectContextCreateManyInput | ProjectContextCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectContext update
   */
  export type ProjectContextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectContext.
     */
    data: XOR<ProjectContextUpdateInput, ProjectContextUncheckedUpdateInput>
    /**
     * Choose, which ProjectContext to update.
     */
    where: ProjectContextWhereUniqueInput
  }

  /**
   * ProjectContext updateMany
   */
  export type ProjectContextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectContexts.
     */
    data: XOR<ProjectContextUpdateManyMutationInput, ProjectContextUncheckedUpdateManyInput>
    /**
     * Filter which ProjectContexts to update
     */
    where?: ProjectContextWhereInput
    /**
     * Limit how many ProjectContexts to update.
     */
    limit?: number
  }

  /**
   * ProjectContext updateManyAndReturn
   */
  export type ProjectContextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * The data used to update ProjectContexts.
     */
    data: XOR<ProjectContextUpdateManyMutationInput, ProjectContextUncheckedUpdateManyInput>
    /**
     * Filter which ProjectContexts to update
     */
    where?: ProjectContextWhereInput
    /**
     * Limit how many ProjectContexts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectContext upsert
   */
  export type ProjectContextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectContext to update in case it exists.
     */
    where: ProjectContextWhereUniqueInput
    /**
     * In case the ProjectContext found by the `where` argument doesn't exist, create a new ProjectContext with this data.
     */
    create: XOR<ProjectContextCreateInput, ProjectContextUncheckedCreateInput>
    /**
     * In case the ProjectContext was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectContextUpdateInput, ProjectContextUncheckedUpdateInput>
  }

  /**
   * ProjectContext delete
   */
  export type ProjectContextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
    /**
     * Filter which ProjectContext to delete.
     */
    where: ProjectContextWhereUniqueInput
  }

  /**
   * ProjectContext deleteMany
   */
  export type ProjectContextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectContexts to delete
     */
    where?: ProjectContextWhereInput
    /**
     * Limit how many ProjectContexts to delete.
     */
    limit?: number
  }

  /**
   * ProjectContext without action
   */
  export type ProjectContextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContext
     */
    select?: ProjectContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContext
     */
    omit?: ProjectContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContextInclude<ExtArgs> | null
  }


  /**
   * Model Todo
   */

  export type AggregateTodo = {
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  export type TodoMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    projectPath: string | null
    title: string | null
    description: string | null
    status: $Enums.TodoStatus | null
    priority: $Enums.Priority | null
    tags: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    archivedAt: Date | null
    blockedReason: string | null
    assignee: string | null
    metadata: string | null
  }

  export type TodoMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    projectPath: string | null
    title: string | null
    description: string | null
    status: $Enums.TodoStatus | null
    priority: $Enums.Priority | null
    tags: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    archivedAt: Date | null
    blockedReason: string | null
    assignee: string | null
    metadata: string | null
  }

  export type TodoCountAggregateOutputType = {
    id: number
    conversationId: number
    projectPath: number
    title: number
    description: number
    status: number
    priority: number
    tags: number
    createdAt: number
    updatedAt: number
    completedAt: number
    archivedAt: number
    blockedReason: number
    assignee: number
    metadata: number
    _all: number
  }


  export type TodoMinAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
    blockedReason?: true
    assignee?: true
    metadata?: true
  }

  export type TodoMaxAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
    blockedReason?: true
    assignee?: true
    metadata?: true
  }

  export type TodoCountAggregateInputType = {
    id?: true
    conversationId?: true
    projectPath?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
    blockedReason?: true
    assignee?: true
    metadata?: true
    _all?: true
  }

  export type TodoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todo to aggregate.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Todos
    **/
    _count?: true | TodoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TodoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TodoMaxAggregateInputType
  }

  export type GetTodoAggregateType<T extends TodoAggregateArgs> = {
        [P in keyof T & keyof AggregateTodo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodo[P]>
      : GetScalarType<T[P], AggregateTodo[P]>
  }




  export type TodoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TodoWhereInput
    orderBy?: TodoOrderByWithAggregationInput | TodoOrderByWithAggregationInput[]
    by: TodoScalarFieldEnum[] | TodoScalarFieldEnum
    having?: TodoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TodoCountAggregateInputType | true
    _min?: TodoMinAggregateInputType
    _max?: TodoMaxAggregateInputType
  }

  export type TodoGroupByOutputType = {
    id: string
    conversationId: string
    projectPath: string | null
    title: string
    description: string | null
    status: $Enums.TodoStatus
    priority: $Enums.Priority | null
    tags: string | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    archivedAt: Date | null
    blockedReason: string | null
    assignee: string | null
    metadata: string | null
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  type GetTodoGroupByPayload<T extends TodoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TodoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TodoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TodoGroupByOutputType[P]>
            : GetScalarType<T[P], TodoGroupByOutputType[P]>
        }
      >
    >


  export type TodoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    blockedReason?: boolean
    assignee?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    blockedReason?: boolean
    assignee?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    blockedReason?: boolean
    assignee?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectScalar = {
    id?: boolean
    conversationId?: boolean
    projectPath?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    blockedReason?: boolean
    assignee?: boolean
    metadata?: boolean
  }

  export type TodoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "projectPath" | "title" | "description" | "status" | "priority" | "tags" | "createdAt" | "updatedAt" | "completedAt" | "archivedAt" | "blockedReason" | "assignee" | "metadata", ExtArgs["result"]["todo"]>

  export type $TodoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Todo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      projectPath: string | null
      title: string
      description: string | null
      status: $Enums.TodoStatus
      priority: $Enums.Priority | null
      tags: string | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
      archivedAt: Date | null
      blockedReason: string | null
      assignee: string | null
      metadata: string | null
    }, ExtArgs["result"]["todo"]>
    composites: {}
  }

  type TodoGetPayload<S extends boolean | null | undefined | TodoDefaultArgs> = $Result.GetResult<Prisma.$TodoPayload, S>

  type TodoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TodoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TodoCountAggregateInputType | true
    }

  export interface TodoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Todo'], meta: { name: 'Todo' } }
    /**
     * Find zero or one Todo that matches the filter.
     * @param {TodoFindUniqueArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TodoFindUniqueArgs>(args: SelectSubset<T, TodoFindUniqueArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Todo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TodoFindUniqueOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TodoFindUniqueOrThrowArgs>(args: SelectSubset<T, TodoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TodoFindFirstArgs>(args?: SelectSubset<T, TodoFindFirstArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TodoFindFirstOrThrowArgs>(args?: SelectSubset<T, TodoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Todos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todos
     * const todos = await prisma.todo.findMany()
     * 
     * // Get first 10 Todos
     * const todos = await prisma.todo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const todoWithIdOnly = await prisma.todo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TodoFindManyArgs>(args?: SelectSubset<T, TodoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Todo.
     * @param {TodoCreateArgs} args - Arguments to create a Todo.
     * @example
     * // Create one Todo
     * const Todo = await prisma.todo.create({
     *   data: {
     *     // ... data to create a Todo
     *   }
     * })
     * 
     */
    create<T extends TodoCreateArgs>(args: SelectSubset<T, TodoCreateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Todos.
     * @param {TodoCreateManyArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TodoCreateManyArgs>(args?: SelectSubset<T, TodoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Todos and returns the data saved in the database.
     * @param {TodoCreateManyAndReturnArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TodoCreateManyAndReturnArgs>(args?: SelectSubset<T, TodoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Todo.
     * @param {TodoDeleteArgs} args - Arguments to delete one Todo.
     * @example
     * // Delete one Todo
     * const Todo = await prisma.todo.delete({
     *   where: {
     *     // ... filter to delete one Todo
     *   }
     * })
     * 
     */
    delete<T extends TodoDeleteArgs>(args: SelectSubset<T, TodoDeleteArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Todo.
     * @param {TodoUpdateArgs} args - Arguments to update one Todo.
     * @example
     * // Update one Todo
     * const todo = await prisma.todo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TodoUpdateArgs>(args: SelectSubset<T, TodoUpdateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Todos.
     * @param {TodoDeleteManyArgs} args - Arguments to filter Todos to delete.
     * @example
     * // Delete a few Todos
     * const { count } = await prisma.todo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TodoDeleteManyArgs>(args?: SelectSubset<T, TodoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TodoUpdateManyArgs>(args: SelectSubset<T, TodoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos and returns the data updated in the database.
     * @param {TodoUpdateManyAndReturnArgs} args - Arguments to update many Todos.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TodoUpdateManyAndReturnArgs>(args: SelectSubset<T, TodoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Todo.
     * @param {TodoUpsertArgs} args - Arguments to update or create a Todo.
     * @example
     * // Update or create a Todo
     * const todo = await prisma.todo.upsert({
     *   create: {
     *     // ... data to create a Todo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todo we want to update
     *   }
     * })
     */
    upsert<T extends TodoUpsertArgs>(args: SelectSubset<T, TodoUpsertArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoCountArgs} args - Arguments to filter Todos to count.
     * @example
     * // Count the number of Todos
     * const count = await prisma.todo.count({
     *   where: {
     *     // ... the filter for the Todos we want to count
     *   }
     * })
    **/
    count<T extends TodoCountArgs>(
      args?: Subset<T, TodoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodoAggregateArgs>(args: Subset<T, TodoAggregateArgs>): Prisma.PrismaPromise<GetTodoAggregateType<T>>

    /**
     * Group by Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TodoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TodoGroupByArgs['orderBy'] }
        : { orderBy?: TodoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TodoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Todo model
   */
  readonly fields: TodoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Todo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TodoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Todo model
   */
  interface TodoFieldRefs {
    readonly id: FieldRef<"Todo", 'String'>
    readonly conversationId: FieldRef<"Todo", 'String'>
    readonly projectPath: FieldRef<"Todo", 'String'>
    readonly title: FieldRef<"Todo", 'String'>
    readonly description: FieldRef<"Todo", 'String'>
    readonly status: FieldRef<"Todo", 'TodoStatus'>
    readonly priority: FieldRef<"Todo", 'Priority'>
    readonly tags: FieldRef<"Todo", 'String'>
    readonly createdAt: FieldRef<"Todo", 'DateTime'>
    readonly updatedAt: FieldRef<"Todo", 'DateTime'>
    readonly completedAt: FieldRef<"Todo", 'DateTime'>
    readonly archivedAt: FieldRef<"Todo", 'DateTime'>
    readonly blockedReason: FieldRef<"Todo", 'String'>
    readonly assignee: FieldRef<"Todo", 'String'>
    readonly metadata: FieldRef<"Todo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Todo findUnique
   */
  export type TodoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findUniqueOrThrow
   */
  export type TodoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findFirst
   */
  export type TodoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findFirstOrThrow
   */
  export type TodoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findMany
   */
  export type TodoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todos to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo create
   */
  export type TodoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data needed to create a Todo.
     */
    data: XOR<TodoCreateInput, TodoUncheckedCreateInput>
  }

  /**
   * Todo createMany
   */
  export type TodoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
  }

  /**
   * Todo createManyAndReturn
   */
  export type TodoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
  }

  /**
   * Todo update
   */
  export type TodoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data needed to update a Todo.
     */
    data: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
    /**
     * Choose, which Todo to update.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo updateMany
   */
  export type TodoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
  }

  /**
   * Todo updateManyAndReturn
   */
  export type TodoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
  }

  /**
   * Todo upsert
   */
  export type TodoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The filter to search for the Todo to update in case it exists.
     */
    where: TodoWhereUniqueInput
    /**
     * In case the Todo found by the `where` argument doesn't exist, create a new Todo with this data.
     */
    create: XOR<TodoCreateInput, TodoUncheckedCreateInput>
    /**
     * In case the Todo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
  }

  /**
   * Todo delete
   */
  export type TodoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter which Todo to delete.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo deleteMany
   */
  export type TodoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todos to delete
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to delete.
     */
    limit?: number
  }

  /**
   * Todo without action
   */
  export type TodoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    messageCount: 'messageCount'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    audioUrl: 'audioUrl',
    ssmlUsed: 'ssmlUsed',
    timestamp: 'timestamp',
    metrics: 'metrics'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    openai: 'openai',
    elevenlabs: 'elevenlabs',
    gemini: 'gemini',
    anthropic: 'anthropic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const VoiceConfigScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    voiceId: 'voiceId',
    model: 'model',
    ssmlEnabled: 'ssmlEnabled',
    ssmlModel: 'ssmlModel',
    prosodyEnabled: 'prosodyEnabled',
    emphasisEnabled: 'emphasisEnabled',
    phonemesEnabled: 'phonemesEnabled',
    formality: 'formality',
    maxBreaksPer100Words: 'maxBreaksPer100Words',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VoiceConfigScalarFieldEnum = (typeof VoiceConfigScalarFieldEnum)[keyof typeof VoiceConfigScalarFieldEnum]


  export const ClaudeConfigScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    systemPromptTemplate: 'systemPromptTemplate',
    voiceEnabled: 'voiceEnabled',
    voiceDirectives: 'voiceDirectives',
    model: 'model',
    maxTurns: 'maxTurns',
    permissionMode: 'permissionMode',
    allowedTools: 'allowedTools',
    disallowedTools: 'disallowedTools',
    mcpServers: 'mcpServers',
    customInstructions: 'customInstructions',
    templateVars: 'templateVars',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClaudeConfigScalarFieldEnum = (typeof ClaudeConfigScalarFieldEnum)[keyof typeof ClaudeConfigScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    inputDeviceId: 'inputDeviceId',
    sampleRate: 'sampleRate',
    noiseSuppressionEnabled: 'noiseSuppressionEnabled',
    vadThreshold: 'vadThreshold',
    minSilenceMs: 'minSilenceMs',
    maxUtteranceMs: 'maxUtteranceMs',
    minSpeechMs: 'minSpeechMs',
    trimLongSilences: 'trimLongSilences',
    maxChunkLengthMs: 'maxChunkLengthMs',
    sttProvider: 'sttProvider',
    sttModel: 'sttModel',
    sttLocale: 'sttLocale',
    sttEncoding: 'sttEncoding',
    sendPartials: 'sendPartials',
    ttsProvider: 'ttsProvider',
    ttsVoiceId: 'ttsVoiceId',
    ttsModel: 'ttsModel',
    ttsStreamPlayback: 'ttsStreamPlayback',
    ttsAutoplay: 'ttsAutoplay',
    ssmlEnabled: 'ssmlEnabled',
    ssmlModel: 'ssmlModel',
    ssmlEnableProsody: 'ssmlEnableProsody',
    ssmlEnableEmphasis: 'ssmlEnableEmphasis',
    ssmlEnablePhonemes: 'ssmlEnablePhonemes',
    ssmlFormality: 'ssmlFormality',
    ssmlMaxBreaksPer100Words: 'ssmlMaxBreaksPer100Words',
    defaultMode: 'defaultMode',
    autoSendInAutoMode: 'autoSendInAutoMode',
    pttKeybinding: 'pttKeybinding',
    keepConversationHistory: 'keepConversationHistory',
    retentionDays: 'retentionDays',
    loggingLevel: 'loggingLevel',
    metricsEnabled: 'metricsEnabled',
    backendUrl: 'backendUrl',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const ProjectContextScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    projectPath: 'projectPath',
    projectName: 'projectName',
    claudeMdPath: 'claudeMdPath',
    devCommand: 'devCommand',
    buildCommand: 'buildCommand',
    testCommand: 'testCommand',
    stopCommand: 'stopCommand',
    settings: 'settings',
    createdAt: 'createdAt',
    lastAccessedAt: 'lastAccessedAt'
  };

  export type ProjectContextScalarFieldEnum = (typeof ProjectContextScalarFieldEnum)[keyof typeof ProjectContextScalarFieldEnum]


  export const TodoScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    projectPath: 'projectPath',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt',
    archivedAt: 'archivedAt',
    blockedReason: 'blockedReason',
    assignee: 'assignee',
    metadata: 'metadata'
  };

  export type TodoScalarFieldEnum = (typeof TodoScalarFieldEnum)[keyof typeof TodoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'TodoStatus'
   */
  export type EnumTodoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TodoStatus'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    conversations?: ConversationListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    conversations?: ConversationListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    projectId?: StringNullableFilter<"Conversation"> | string | null
    name?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messageCount?: IntFilter<"Conversation"> | number
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    messages?: MessageListRelationFilter
    apiKeys?: XOR<ApiKeyNullableScalarRelationFilter, ApiKeyWhereInput> | null
    voiceConfig?: XOR<VoiceConfigNullableScalarRelationFilter, VoiceConfigWhereInput> | null
    projectContext?: XOR<ProjectContextNullableScalarRelationFilter, ProjectContextWhereInput> | null
    claudeConfig?: XOR<ClaudeConfigNullableScalarRelationFilter, ClaudeConfigWhereInput> | null
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messageCount?: SortOrder
    project?: ProjectOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByWithRelationInput
    voiceConfig?: VoiceConfigOrderByWithRelationInput
    projectContext?: ProjectContextOrderByWithRelationInput
    claudeConfig?: ClaudeConfigOrderByWithRelationInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    projectId?: StringNullableFilter<"Conversation"> | string | null
    name?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messageCount?: IntFilter<"Conversation"> | number
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    messages?: MessageListRelationFilter
    apiKeys?: XOR<ApiKeyNullableScalarRelationFilter, ApiKeyWhereInput> | null
    voiceConfig?: XOR<VoiceConfigNullableScalarRelationFilter, VoiceConfigWhereInput> | null
    projectContext?: XOR<ProjectContextNullableScalarRelationFilter, ProjectContextWhereInput> | null
    claudeConfig?: XOR<ClaudeConfigNullableScalarRelationFilter, ClaudeConfigWhereInput> | null
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messageCount?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _avg?: ConversationAvgOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
    _sum?: ConversationSumOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    projectId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    name?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    messageCount?: IntWithAggregatesFilter<"Conversation"> | number
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    ssmlUsed?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metrics?: StringNullableFilter<"Message"> | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    ssmlUsed?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    metrics?: SortOrderInput | SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    ssmlUsed?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metrics?: StringNullableFilter<"Message"> | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    ssmlUsed?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    metrics?: SortOrderInput | SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    audioUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    ssmlUsed?: StringNullableWithAggregatesFilter<"Message"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    metrics?: StringNullableWithAggregatesFilter<"Message"> | string | null
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    conversationId?: StringFilter<"ApiKey"> | string
    openai?: StringNullableFilter<"ApiKey"> | string | null
    elevenlabs?: StringNullableFilter<"ApiKey"> | string | null
    gemini?: StringNullableFilter<"ApiKey"> | string | null
    anthropic?: StringNullableFilter<"ApiKey"> | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    openai?: SortOrderInput | SortOrder
    elevenlabs?: SortOrderInput | SortOrder
    gemini?: SortOrderInput | SortOrder
    anthropic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    openai?: StringNullableFilter<"ApiKey"> | string | null
    elevenlabs?: StringNullableFilter<"ApiKey"> | string | null
    gemini?: StringNullableFilter<"ApiKey"> | string | null
    anthropic?: StringNullableFilter<"ApiKey"> | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "conversationId">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    openai?: SortOrderInput | SortOrder
    elevenlabs?: SortOrderInput | SortOrder
    gemini?: SortOrderInput | SortOrder
    anthropic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    conversationId?: StringWithAggregatesFilter<"ApiKey"> | string
    openai?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    elevenlabs?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    gemini?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    anthropic?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type VoiceConfigWhereInput = {
    AND?: VoiceConfigWhereInput | VoiceConfigWhereInput[]
    OR?: VoiceConfigWhereInput[]
    NOT?: VoiceConfigWhereInput | VoiceConfigWhereInput[]
    id?: StringFilter<"VoiceConfig"> | string
    conversationId?: StringFilter<"VoiceConfig"> | string
    voiceId?: StringNullableFilter<"VoiceConfig"> | string | null
    model?: StringFilter<"VoiceConfig"> | string
    ssmlEnabled?: BoolFilter<"VoiceConfig"> | boolean
    ssmlModel?: StringFilter<"VoiceConfig"> | string
    prosodyEnabled?: BoolFilter<"VoiceConfig"> | boolean
    emphasisEnabled?: BoolFilter<"VoiceConfig"> | boolean
    phonemesEnabled?: BoolFilter<"VoiceConfig"> | boolean
    formality?: StringFilter<"VoiceConfig"> | string
    maxBreaksPer100Words?: IntFilter<"VoiceConfig"> | number
    createdAt?: DateTimeFilter<"VoiceConfig"> | Date | string
    updatedAt?: DateTimeFilter<"VoiceConfig"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type VoiceConfigOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    voiceId?: SortOrderInput | SortOrder
    model?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    prosodyEnabled?: SortOrder
    emphasisEnabled?: SortOrder
    phonemesEnabled?: SortOrder
    formality?: SortOrder
    maxBreaksPer100Words?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type VoiceConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: VoiceConfigWhereInput | VoiceConfigWhereInput[]
    OR?: VoiceConfigWhereInput[]
    NOT?: VoiceConfigWhereInput | VoiceConfigWhereInput[]
    voiceId?: StringNullableFilter<"VoiceConfig"> | string | null
    model?: StringFilter<"VoiceConfig"> | string
    ssmlEnabled?: BoolFilter<"VoiceConfig"> | boolean
    ssmlModel?: StringFilter<"VoiceConfig"> | string
    prosodyEnabled?: BoolFilter<"VoiceConfig"> | boolean
    emphasisEnabled?: BoolFilter<"VoiceConfig"> | boolean
    phonemesEnabled?: BoolFilter<"VoiceConfig"> | boolean
    formality?: StringFilter<"VoiceConfig"> | string
    maxBreaksPer100Words?: IntFilter<"VoiceConfig"> | number
    createdAt?: DateTimeFilter<"VoiceConfig"> | Date | string
    updatedAt?: DateTimeFilter<"VoiceConfig"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "conversationId">

  export type VoiceConfigOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    voiceId?: SortOrderInput | SortOrder
    model?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    prosodyEnabled?: SortOrder
    emphasisEnabled?: SortOrder
    phonemesEnabled?: SortOrder
    formality?: SortOrder
    maxBreaksPer100Words?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VoiceConfigCountOrderByAggregateInput
    _avg?: VoiceConfigAvgOrderByAggregateInput
    _max?: VoiceConfigMaxOrderByAggregateInput
    _min?: VoiceConfigMinOrderByAggregateInput
    _sum?: VoiceConfigSumOrderByAggregateInput
  }

  export type VoiceConfigScalarWhereWithAggregatesInput = {
    AND?: VoiceConfigScalarWhereWithAggregatesInput | VoiceConfigScalarWhereWithAggregatesInput[]
    OR?: VoiceConfigScalarWhereWithAggregatesInput[]
    NOT?: VoiceConfigScalarWhereWithAggregatesInput | VoiceConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VoiceConfig"> | string
    conversationId?: StringWithAggregatesFilter<"VoiceConfig"> | string
    voiceId?: StringNullableWithAggregatesFilter<"VoiceConfig"> | string | null
    model?: StringWithAggregatesFilter<"VoiceConfig"> | string
    ssmlEnabled?: BoolWithAggregatesFilter<"VoiceConfig"> | boolean
    ssmlModel?: StringWithAggregatesFilter<"VoiceConfig"> | string
    prosodyEnabled?: BoolWithAggregatesFilter<"VoiceConfig"> | boolean
    emphasisEnabled?: BoolWithAggregatesFilter<"VoiceConfig"> | boolean
    phonemesEnabled?: BoolWithAggregatesFilter<"VoiceConfig"> | boolean
    formality?: StringWithAggregatesFilter<"VoiceConfig"> | string
    maxBreaksPer100Words?: IntWithAggregatesFilter<"VoiceConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"VoiceConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VoiceConfig"> | Date | string
  }

  export type ClaudeConfigWhereInput = {
    AND?: ClaudeConfigWhereInput | ClaudeConfigWhereInput[]
    OR?: ClaudeConfigWhereInput[]
    NOT?: ClaudeConfigWhereInput | ClaudeConfigWhereInput[]
    id?: StringFilter<"ClaudeConfig"> | string
    conversationId?: StringFilter<"ClaudeConfig"> | string
    systemPromptTemplate?: StringNullableFilter<"ClaudeConfig"> | string | null
    voiceEnabled?: BoolFilter<"ClaudeConfig"> | boolean
    voiceDirectives?: StringNullableFilter<"ClaudeConfig"> | string | null
    model?: StringFilter<"ClaudeConfig"> | string
    maxTurns?: IntFilter<"ClaudeConfig"> | number
    permissionMode?: StringFilter<"ClaudeConfig"> | string
    allowedTools?: StringNullableFilter<"ClaudeConfig"> | string | null
    disallowedTools?: StringNullableFilter<"ClaudeConfig"> | string | null
    mcpServers?: StringNullableFilter<"ClaudeConfig"> | string | null
    customInstructions?: StringNullableFilter<"ClaudeConfig"> | string | null
    templateVars?: StringNullableFilter<"ClaudeConfig"> | string | null
    createdAt?: DateTimeFilter<"ClaudeConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ClaudeConfig"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type ClaudeConfigOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    systemPromptTemplate?: SortOrderInput | SortOrder
    voiceEnabled?: SortOrder
    voiceDirectives?: SortOrderInput | SortOrder
    model?: SortOrder
    maxTurns?: SortOrder
    permissionMode?: SortOrder
    allowedTools?: SortOrderInput | SortOrder
    disallowedTools?: SortOrderInput | SortOrder
    mcpServers?: SortOrderInput | SortOrder
    customInstructions?: SortOrderInput | SortOrder
    templateVars?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type ClaudeConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: ClaudeConfigWhereInput | ClaudeConfigWhereInput[]
    OR?: ClaudeConfigWhereInput[]
    NOT?: ClaudeConfigWhereInput | ClaudeConfigWhereInput[]
    systemPromptTemplate?: StringNullableFilter<"ClaudeConfig"> | string | null
    voiceEnabled?: BoolFilter<"ClaudeConfig"> | boolean
    voiceDirectives?: StringNullableFilter<"ClaudeConfig"> | string | null
    model?: StringFilter<"ClaudeConfig"> | string
    maxTurns?: IntFilter<"ClaudeConfig"> | number
    permissionMode?: StringFilter<"ClaudeConfig"> | string
    allowedTools?: StringNullableFilter<"ClaudeConfig"> | string | null
    disallowedTools?: StringNullableFilter<"ClaudeConfig"> | string | null
    mcpServers?: StringNullableFilter<"ClaudeConfig"> | string | null
    customInstructions?: StringNullableFilter<"ClaudeConfig"> | string | null
    templateVars?: StringNullableFilter<"ClaudeConfig"> | string | null
    createdAt?: DateTimeFilter<"ClaudeConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ClaudeConfig"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "conversationId">

  export type ClaudeConfigOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    systemPromptTemplate?: SortOrderInput | SortOrder
    voiceEnabled?: SortOrder
    voiceDirectives?: SortOrderInput | SortOrder
    model?: SortOrder
    maxTurns?: SortOrder
    permissionMode?: SortOrder
    allowedTools?: SortOrderInput | SortOrder
    disallowedTools?: SortOrderInput | SortOrder
    mcpServers?: SortOrderInput | SortOrder
    customInstructions?: SortOrderInput | SortOrder
    templateVars?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClaudeConfigCountOrderByAggregateInput
    _avg?: ClaudeConfigAvgOrderByAggregateInput
    _max?: ClaudeConfigMaxOrderByAggregateInput
    _min?: ClaudeConfigMinOrderByAggregateInput
    _sum?: ClaudeConfigSumOrderByAggregateInput
  }

  export type ClaudeConfigScalarWhereWithAggregatesInput = {
    AND?: ClaudeConfigScalarWhereWithAggregatesInput | ClaudeConfigScalarWhereWithAggregatesInput[]
    OR?: ClaudeConfigScalarWhereWithAggregatesInput[]
    NOT?: ClaudeConfigScalarWhereWithAggregatesInput | ClaudeConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaudeConfig"> | string
    conversationId?: StringWithAggregatesFilter<"ClaudeConfig"> | string
    systemPromptTemplate?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    voiceEnabled?: BoolWithAggregatesFilter<"ClaudeConfig"> | boolean
    voiceDirectives?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    model?: StringWithAggregatesFilter<"ClaudeConfig"> | string
    maxTurns?: IntWithAggregatesFilter<"ClaudeConfig"> | number
    permissionMode?: StringWithAggregatesFilter<"ClaudeConfig"> | string
    allowedTools?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    disallowedTools?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    mcpServers?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    customInstructions?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    templateVars?: StringNullableWithAggregatesFilter<"ClaudeConfig"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ClaudeConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClaudeConfig"> | Date | string
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: IntFilter<"Settings"> | number
    inputDeviceId?: StringNullableFilter<"Settings"> | string | null
    sampleRate?: IntFilter<"Settings"> | number
    noiseSuppressionEnabled?: BoolFilter<"Settings"> | boolean
    vadThreshold?: FloatFilter<"Settings"> | number
    minSilenceMs?: IntFilter<"Settings"> | number
    maxUtteranceMs?: IntFilter<"Settings"> | number
    minSpeechMs?: IntFilter<"Settings"> | number
    trimLongSilences?: BoolFilter<"Settings"> | boolean
    maxChunkLengthMs?: IntFilter<"Settings"> | number
    sttProvider?: StringFilter<"Settings"> | string
    sttModel?: StringFilter<"Settings"> | string
    sttLocale?: StringFilter<"Settings"> | string
    sttEncoding?: StringFilter<"Settings"> | string
    sendPartials?: BoolFilter<"Settings"> | boolean
    ttsProvider?: StringFilter<"Settings"> | string
    ttsVoiceId?: StringNullableFilter<"Settings"> | string | null
    ttsModel?: StringFilter<"Settings"> | string
    ttsStreamPlayback?: BoolFilter<"Settings"> | boolean
    ttsAutoplay?: BoolFilter<"Settings"> | boolean
    ssmlEnabled?: BoolFilter<"Settings"> | boolean
    ssmlModel?: StringFilter<"Settings"> | string
    ssmlEnableProsody?: BoolFilter<"Settings"> | boolean
    ssmlEnableEmphasis?: BoolFilter<"Settings"> | boolean
    ssmlEnablePhonemes?: BoolFilter<"Settings"> | boolean
    ssmlFormality?: StringFilter<"Settings"> | string
    ssmlMaxBreaksPer100Words?: IntFilter<"Settings"> | number
    defaultMode?: StringFilter<"Settings"> | string
    autoSendInAutoMode?: BoolFilter<"Settings"> | boolean
    pttKeybinding?: StringFilter<"Settings"> | string
    keepConversationHistory?: BoolFilter<"Settings"> | boolean
    retentionDays?: IntFilter<"Settings"> | number
    loggingLevel?: StringFilter<"Settings"> | string
    metricsEnabled?: BoolFilter<"Settings"> | boolean
    backendUrl?: StringFilter<"Settings"> | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    inputDeviceId?: SortOrderInput | SortOrder
    sampleRate?: SortOrder
    noiseSuppressionEnabled?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    trimLongSilences?: SortOrder
    maxChunkLengthMs?: SortOrder
    sttProvider?: SortOrder
    sttModel?: SortOrder
    sttLocale?: SortOrder
    sttEncoding?: SortOrder
    sendPartials?: SortOrder
    ttsProvider?: SortOrder
    ttsVoiceId?: SortOrderInput | SortOrder
    ttsModel?: SortOrder
    ttsStreamPlayback?: SortOrder
    ttsAutoplay?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    ssmlEnableProsody?: SortOrder
    ssmlEnableEmphasis?: SortOrder
    ssmlEnablePhonemes?: SortOrder
    ssmlFormality?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    defaultMode?: SortOrder
    autoSendInAutoMode?: SortOrder
    pttKeybinding?: SortOrder
    keepConversationHistory?: SortOrder
    retentionDays?: SortOrder
    loggingLevel?: SortOrder
    metricsEnabled?: SortOrder
    backendUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    inputDeviceId?: StringNullableFilter<"Settings"> | string | null
    sampleRate?: IntFilter<"Settings"> | number
    noiseSuppressionEnabled?: BoolFilter<"Settings"> | boolean
    vadThreshold?: FloatFilter<"Settings"> | number
    minSilenceMs?: IntFilter<"Settings"> | number
    maxUtteranceMs?: IntFilter<"Settings"> | number
    minSpeechMs?: IntFilter<"Settings"> | number
    trimLongSilences?: BoolFilter<"Settings"> | boolean
    maxChunkLengthMs?: IntFilter<"Settings"> | number
    sttProvider?: StringFilter<"Settings"> | string
    sttModel?: StringFilter<"Settings"> | string
    sttLocale?: StringFilter<"Settings"> | string
    sttEncoding?: StringFilter<"Settings"> | string
    sendPartials?: BoolFilter<"Settings"> | boolean
    ttsProvider?: StringFilter<"Settings"> | string
    ttsVoiceId?: StringNullableFilter<"Settings"> | string | null
    ttsModel?: StringFilter<"Settings"> | string
    ttsStreamPlayback?: BoolFilter<"Settings"> | boolean
    ttsAutoplay?: BoolFilter<"Settings"> | boolean
    ssmlEnabled?: BoolFilter<"Settings"> | boolean
    ssmlModel?: StringFilter<"Settings"> | string
    ssmlEnableProsody?: BoolFilter<"Settings"> | boolean
    ssmlEnableEmphasis?: BoolFilter<"Settings"> | boolean
    ssmlEnablePhonemes?: BoolFilter<"Settings"> | boolean
    ssmlFormality?: StringFilter<"Settings"> | string
    ssmlMaxBreaksPer100Words?: IntFilter<"Settings"> | number
    defaultMode?: StringFilter<"Settings"> | string
    autoSendInAutoMode?: BoolFilter<"Settings"> | boolean
    pttKeybinding?: StringFilter<"Settings"> | string
    keepConversationHistory?: BoolFilter<"Settings"> | boolean
    retentionDays?: IntFilter<"Settings"> | number
    loggingLevel?: StringFilter<"Settings"> | string
    metricsEnabled?: BoolFilter<"Settings"> | boolean
    backendUrl?: StringFilter<"Settings"> | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }, "id">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    inputDeviceId?: SortOrderInput | SortOrder
    sampleRate?: SortOrder
    noiseSuppressionEnabled?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    trimLongSilences?: SortOrder
    maxChunkLengthMs?: SortOrder
    sttProvider?: SortOrder
    sttModel?: SortOrder
    sttLocale?: SortOrder
    sttEncoding?: SortOrder
    sendPartials?: SortOrder
    ttsProvider?: SortOrder
    ttsVoiceId?: SortOrderInput | SortOrder
    ttsModel?: SortOrder
    ttsStreamPlayback?: SortOrder
    ttsAutoplay?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    ssmlEnableProsody?: SortOrder
    ssmlEnableEmphasis?: SortOrder
    ssmlEnablePhonemes?: SortOrder
    ssmlFormality?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    defaultMode?: SortOrder
    autoSendInAutoMode?: SortOrder
    pttKeybinding?: SortOrder
    keepConversationHistory?: SortOrder
    retentionDays?: SortOrder
    loggingLevel?: SortOrder
    metricsEnabled?: SortOrder
    backendUrl?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _avg?: SettingsAvgOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
    _sum?: SettingsSumOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Settings"> | number
    inputDeviceId?: StringNullableWithAggregatesFilter<"Settings"> | string | null
    sampleRate?: IntWithAggregatesFilter<"Settings"> | number
    noiseSuppressionEnabled?: BoolWithAggregatesFilter<"Settings"> | boolean
    vadThreshold?: FloatWithAggregatesFilter<"Settings"> | number
    minSilenceMs?: IntWithAggregatesFilter<"Settings"> | number
    maxUtteranceMs?: IntWithAggregatesFilter<"Settings"> | number
    minSpeechMs?: IntWithAggregatesFilter<"Settings"> | number
    trimLongSilences?: BoolWithAggregatesFilter<"Settings"> | boolean
    maxChunkLengthMs?: IntWithAggregatesFilter<"Settings"> | number
    sttProvider?: StringWithAggregatesFilter<"Settings"> | string
    sttModel?: StringWithAggregatesFilter<"Settings"> | string
    sttLocale?: StringWithAggregatesFilter<"Settings"> | string
    sttEncoding?: StringWithAggregatesFilter<"Settings"> | string
    sendPartials?: BoolWithAggregatesFilter<"Settings"> | boolean
    ttsProvider?: StringWithAggregatesFilter<"Settings"> | string
    ttsVoiceId?: StringNullableWithAggregatesFilter<"Settings"> | string | null
    ttsModel?: StringWithAggregatesFilter<"Settings"> | string
    ttsStreamPlayback?: BoolWithAggregatesFilter<"Settings"> | boolean
    ttsAutoplay?: BoolWithAggregatesFilter<"Settings"> | boolean
    ssmlEnabled?: BoolWithAggregatesFilter<"Settings"> | boolean
    ssmlModel?: StringWithAggregatesFilter<"Settings"> | string
    ssmlEnableProsody?: BoolWithAggregatesFilter<"Settings"> | boolean
    ssmlEnableEmphasis?: BoolWithAggregatesFilter<"Settings"> | boolean
    ssmlEnablePhonemes?: BoolWithAggregatesFilter<"Settings"> | boolean
    ssmlFormality?: StringWithAggregatesFilter<"Settings"> | string
    ssmlMaxBreaksPer100Words?: IntWithAggregatesFilter<"Settings"> | number
    defaultMode?: StringWithAggregatesFilter<"Settings"> | string
    autoSendInAutoMode?: BoolWithAggregatesFilter<"Settings"> | boolean
    pttKeybinding?: StringWithAggregatesFilter<"Settings"> | string
    keepConversationHistory?: BoolWithAggregatesFilter<"Settings"> | boolean
    retentionDays?: IntWithAggregatesFilter<"Settings"> | number
    loggingLevel?: StringWithAggregatesFilter<"Settings"> | string
    metricsEnabled?: BoolWithAggregatesFilter<"Settings"> | boolean
    backendUrl?: StringWithAggregatesFilter<"Settings"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type ProjectContextWhereInput = {
    AND?: ProjectContextWhereInput | ProjectContextWhereInput[]
    OR?: ProjectContextWhereInput[]
    NOT?: ProjectContextWhereInput | ProjectContextWhereInput[]
    id?: StringFilter<"ProjectContext"> | string
    conversationId?: StringFilter<"ProjectContext"> | string
    projectPath?: StringFilter<"ProjectContext"> | string
    projectName?: StringFilter<"ProjectContext"> | string
    claudeMdPath?: StringNullableFilter<"ProjectContext"> | string | null
    devCommand?: StringNullableFilter<"ProjectContext"> | string | null
    buildCommand?: StringNullableFilter<"ProjectContext"> | string | null
    testCommand?: StringNullableFilter<"ProjectContext"> | string | null
    stopCommand?: StringNullableFilter<"ProjectContext"> | string | null
    settings?: StringNullableFilter<"ProjectContext"> | string | null
    createdAt?: DateTimeFilter<"ProjectContext"> | Date | string
    lastAccessedAt?: DateTimeFilter<"ProjectContext"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type ProjectContextOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    projectName?: SortOrder
    claudeMdPath?: SortOrderInput | SortOrder
    devCommand?: SortOrderInput | SortOrder
    buildCommand?: SortOrderInput | SortOrder
    testCommand?: SortOrderInput | SortOrder
    stopCommand?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastAccessedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type ProjectContextWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: ProjectContextWhereInput | ProjectContextWhereInput[]
    OR?: ProjectContextWhereInput[]
    NOT?: ProjectContextWhereInput | ProjectContextWhereInput[]
    projectPath?: StringFilter<"ProjectContext"> | string
    projectName?: StringFilter<"ProjectContext"> | string
    claudeMdPath?: StringNullableFilter<"ProjectContext"> | string | null
    devCommand?: StringNullableFilter<"ProjectContext"> | string | null
    buildCommand?: StringNullableFilter<"ProjectContext"> | string | null
    testCommand?: StringNullableFilter<"ProjectContext"> | string | null
    stopCommand?: StringNullableFilter<"ProjectContext"> | string | null
    settings?: StringNullableFilter<"ProjectContext"> | string | null
    createdAt?: DateTimeFilter<"ProjectContext"> | Date | string
    lastAccessedAt?: DateTimeFilter<"ProjectContext"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "conversationId">

  export type ProjectContextOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    projectName?: SortOrder
    claudeMdPath?: SortOrderInput | SortOrder
    devCommand?: SortOrderInput | SortOrder
    buildCommand?: SortOrderInput | SortOrder
    testCommand?: SortOrderInput | SortOrder
    stopCommand?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastAccessedAt?: SortOrder
    _count?: ProjectContextCountOrderByAggregateInput
    _max?: ProjectContextMaxOrderByAggregateInput
    _min?: ProjectContextMinOrderByAggregateInput
  }

  export type ProjectContextScalarWhereWithAggregatesInput = {
    AND?: ProjectContextScalarWhereWithAggregatesInput | ProjectContextScalarWhereWithAggregatesInput[]
    OR?: ProjectContextScalarWhereWithAggregatesInput[]
    NOT?: ProjectContextScalarWhereWithAggregatesInput | ProjectContextScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectContext"> | string
    conversationId?: StringWithAggregatesFilter<"ProjectContext"> | string
    projectPath?: StringWithAggregatesFilter<"ProjectContext"> | string
    projectName?: StringWithAggregatesFilter<"ProjectContext"> | string
    claudeMdPath?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    devCommand?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    buildCommand?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    testCommand?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    stopCommand?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    settings?: StringNullableWithAggregatesFilter<"ProjectContext"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProjectContext"> | Date | string
    lastAccessedAt?: DateTimeWithAggregatesFilter<"ProjectContext"> | Date | string
  }

  export type TodoWhereInput = {
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    id?: StringFilter<"Todo"> | string
    conversationId?: StringFilter<"Todo"> | string
    projectPath?: StringNullableFilter<"Todo"> | string | null
    title?: StringFilter<"Todo"> | string
    description?: StringNullableFilter<"Todo"> | string | null
    status?: EnumTodoStatusFilter<"Todo"> | $Enums.TodoStatus
    priority?: EnumPriorityNullableFilter<"Todo"> | $Enums.Priority | null
    tags?: StringNullableFilter<"Todo"> | string | null
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    updatedAt?: DateTimeFilter<"Todo"> | Date | string
    completedAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    archivedAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    blockedReason?: StringNullableFilter<"Todo"> | string | null
    assignee?: StringNullableFilter<"Todo"> | string | null
    metadata?: StringNullableFilter<"Todo"> | string | null
  }

  export type TodoOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    blockedReason?: SortOrderInput | SortOrder
    assignee?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
  }

  export type TodoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    conversationId?: StringFilter<"Todo"> | string
    projectPath?: StringNullableFilter<"Todo"> | string | null
    title?: StringFilter<"Todo"> | string
    description?: StringNullableFilter<"Todo"> | string | null
    status?: EnumTodoStatusFilter<"Todo"> | $Enums.TodoStatus
    priority?: EnumPriorityNullableFilter<"Todo"> | $Enums.Priority | null
    tags?: StringNullableFilter<"Todo"> | string | null
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    updatedAt?: DateTimeFilter<"Todo"> | Date | string
    completedAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    archivedAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    blockedReason?: StringNullableFilter<"Todo"> | string | null
    assignee?: StringNullableFilter<"Todo"> | string | null
    metadata?: StringNullableFilter<"Todo"> | string | null
  }, "id">

  export type TodoOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    blockedReason?: SortOrderInput | SortOrder
    assignee?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: TodoCountOrderByAggregateInput
    _max?: TodoMaxOrderByAggregateInput
    _min?: TodoMinOrderByAggregateInput
  }

  export type TodoScalarWhereWithAggregatesInput = {
    AND?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    OR?: TodoScalarWhereWithAggregatesInput[]
    NOT?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Todo"> | string
    conversationId?: StringWithAggregatesFilter<"Todo"> | string
    projectPath?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    title?: StringWithAggregatesFilter<"Todo"> | string
    description?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    status?: EnumTodoStatusWithAggregatesFilter<"Todo"> | $Enums.TodoStatus
    priority?: EnumPriorityNullableWithAggregatesFilter<"Todo"> | $Enums.Priority | null
    tags?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Todo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Todo"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Todo"> | Date | string | null
    archivedAt?: DateTimeNullableWithAggregatesFilter<"Todo"> | Date | string | null
    blockedReason?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    assignee?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"Todo"> | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApiKeyCreateInput = {
    id?: string
    openai?: string | null
    elevenlabs?: string | null
    gemini?: string | null
    anthropic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    conversationId: string
    openai?: string | null
    elevenlabs?: string | null
    gemini?: string | null
    anthropic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    conversationId: string
    openai?: string | null
    elevenlabs?: string | null
    gemini?: string | null
    anthropic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceConfigCreateInput = {
    id?: string
    voiceId?: string | null
    model?: string
    ssmlEnabled?: boolean
    ssmlModel?: string
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: string
    maxBreaksPer100Words?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutVoiceConfigInput
  }

  export type VoiceConfigUncheckedCreateInput = {
    id?: string
    conversationId: string
    voiceId?: string | null
    model?: string
    ssmlEnabled?: boolean
    ssmlModel?: string
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: string
    maxBreaksPer100Words?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoiceConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutVoiceConfigNestedInput
  }

  export type VoiceConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceConfigCreateManyInput = {
    id?: string
    conversationId: string
    voiceId?: string | null
    model?: string
    ssmlEnabled?: boolean
    ssmlModel?: string
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: string
    maxBreaksPer100Words?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoiceConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaudeConfigCreateInput = {
    id?: string
    systemPromptTemplate?: string | null
    voiceEnabled?: boolean
    voiceDirectives?: string | null
    model?: string
    maxTurns?: number
    permissionMode?: string
    allowedTools?: string | null
    disallowedTools?: string | null
    mcpServers?: string | null
    customInstructions?: string | null
    templateVars?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutClaudeConfigInput
  }

  export type ClaudeConfigUncheckedCreateInput = {
    id?: string
    conversationId: string
    systemPromptTemplate?: string | null
    voiceEnabled?: boolean
    voiceDirectives?: string | null
    model?: string
    maxTurns?: number
    permissionMode?: string
    allowedTools?: string | null
    disallowedTools?: string | null
    mcpServers?: string | null
    customInstructions?: string | null
    templateVars?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaudeConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutClaudeConfigNestedInput
  }

  export type ClaudeConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaudeConfigCreateManyInput = {
    id?: string
    conversationId: string
    systemPromptTemplate?: string | null
    voiceEnabled?: boolean
    voiceDirectives?: string | null
    model?: string
    maxTurns?: number
    permissionMode?: string
    allowedTools?: string | null
    disallowedTools?: string | null
    mcpServers?: string | null
    customInstructions?: string | null
    templateVars?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaudeConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaudeConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateInput = {
    id?: number
    inputDeviceId?: string | null
    sampleRate?: number
    noiseSuppressionEnabled?: boolean
    vadThreshold?: number
    minSilenceMs?: number
    maxUtteranceMs?: number
    minSpeechMs?: number
    trimLongSilences?: boolean
    maxChunkLengthMs?: number
    sttProvider?: string
    sttModel?: string
    sttLocale?: string
    sttEncoding?: string
    sendPartials?: boolean
    ttsProvider?: string
    ttsVoiceId?: string | null
    ttsModel?: string
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: string
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: string
    ssmlMaxBreaksPer100Words?: number
    defaultMode?: string
    autoSendInAutoMode?: boolean
    pttKeybinding?: string
    keepConversationHistory?: boolean
    retentionDays?: number
    loggingLevel?: string
    metricsEnabled?: boolean
    backendUrl?: string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateInput = {
    id?: number
    inputDeviceId?: string | null
    sampleRate?: number
    noiseSuppressionEnabled?: boolean
    vadThreshold?: number
    minSilenceMs?: number
    maxUtteranceMs?: number
    minSpeechMs?: number
    trimLongSilences?: boolean
    maxChunkLengthMs?: number
    sttProvider?: string
    sttModel?: string
    sttLocale?: string
    sttEncoding?: string
    sendPartials?: boolean
    ttsProvider?: string
    ttsVoiceId?: string | null
    ttsModel?: string
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: string
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: string
    ssmlMaxBreaksPer100Words?: number
    defaultMode?: string
    autoSendInAutoMode?: boolean
    pttKeybinding?: string
    keepConversationHistory?: boolean
    retentionDays?: number
    loggingLevel?: string
    metricsEnabled?: boolean
    backendUrl?: string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    inputDeviceId?: NullableStringFieldUpdateOperationsInput | string | null
    sampleRate?: IntFieldUpdateOperationsInput | number
    noiseSuppressionEnabled?: BoolFieldUpdateOperationsInput | boolean
    vadThreshold?: FloatFieldUpdateOperationsInput | number
    minSilenceMs?: IntFieldUpdateOperationsInput | number
    maxUtteranceMs?: IntFieldUpdateOperationsInput | number
    minSpeechMs?: IntFieldUpdateOperationsInput | number
    trimLongSilences?: BoolFieldUpdateOperationsInput | boolean
    maxChunkLengthMs?: IntFieldUpdateOperationsInput | number
    sttProvider?: StringFieldUpdateOperationsInput | string
    sttModel?: StringFieldUpdateOperationsInput | string
    sttLocale?: StringFieldUpdateOperationsInput | string
    sttEncoding?: StringFieldUpdateOperationsInput | string
    sendPartials?: BoolFieldUpdateOperationsInput | boolean
    ttsProvider?: StringFieldUpdateOperationsInput | string
    ttsVoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    ttsModel?: StringFieldUpdateOperationsInput | string
    ttsStreamPlayback?: BoolFieldUpdateOperationsInput | boolean
    ttsAutoplay?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    ssmlEnableProsody?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnableEmphasis?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnablePhonemes?: BoolFieldUpdateOperationsInput | boolean
    ssmlFormality?: StringFieldUpdateOperationsInput | string
    ssmlMaxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    defaultMode?: StringFieldUpdateOperationsInput | string
    autoSendInAutoMode?: BoolFieldUpdateOperationsInput | boolean
    pttKeybinding?: StringFieldUpdateOperationsInput | string
    keepConversationHistory?: BoolFieldUpdateOperationsInput | boolean
    retentionDays?: IntFieldUpdateOperationsInput | number
    loggingLevel?: StringFieldUpdateOperationsInput | string
    metricsEnabled?: BoolFieldUpdateOperationsInput | boolean
    backendUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    inputDeviceId?: NullableStringFieldUpdateOperationsInput | string | null
    sampleRate?: IntFieldUpdateOperationsInput | number
    noiseSuppressionEnabled?: BoolFieldUpdateOperationsInput | boolean
    vadThreshold?: FloatFieldUpdateOperationsInput | number
    minSilenceMs?: IntFieldUpdateOperationsInput | number
    maxUtteranceMs?: IntFieldUpdateOperationsInput | number
    minSpeechMs?: IntFieldUpdateOperationsInput | number
    trimLongSilences?: BoolFieldUpdateOperationsInput | boolean
    maxChunkLengthMs?: IntFieldUpdateOperationsInput | number
    sttProvider?: StringFieldUpdateOperationsInput | string
    sttModel?: StringFieldUpdateOperationsInput | string
    sttLocale?: StringFieldUpdateOperationsInput | string
    sttEncoding?: StringFieldUpdateOperationsInput | string
    sendPartials?: BoolFieldUpdateOperationsInput | boolean
    ttsProvider?: StringFieldUpdateOperationsInput | string
    ttsVoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    ttsModel?: StringFieldUpdateOperationsInput | string
    ttsStreamPlayback?: BoolFieldUpdateOperationsInput | boolean
    ttsAutoplay?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    ssmlEnableProsody?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnableEmphasis?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnablePhonemes?: BoolFieldUpdateOperationsInput | boolean
    ssmlFormality?: StringFieldUpdateOperationsInput | string
    ssmlMaxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    defaultMode?: StringFieldUpdateOperationsInput | string
    autoSendInAutoMode?: BoolFieldUpdateOperationsInput | boolean
    pttKeybinding?: StringFieldUpdateOperationsInput | string
    keepConversationHistory?: BoolFieldUpdateOperationsInput | boolean
    retentionDays?: IntFieldUpdateOperationsInput | number
    loggingLevel?: StringFieldUpdateOperationsInput | string
    metricsEnabled?: BoolFieldUpdateOperationsInput | boolean
    backendUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: number
    inputDeviceId?: string | null
    sampleRate?: number
    noiseSuppressionEnabled?: boolean
    vadThreshold?: number
    minSilenceMs?: number
    maxUtteranceMs?: number
    minSpeechMs?: number
    trimLongSilences?: boolean
    maxChunkLengthMs?: number
    sttProvider?: string
    sttModel?: string
    sttLocale?: string
    sttEncoding?: string
    sendPartials?: boolean
    ttsProvider?: string
    ttsVoiceId?: string | null
    ttsModel?: string
    ttsStreamPlayback?: boolean
    ttsAutoplay?: boolean
    ssmlEnabled?: boolean
    ssmlModel?: string
    ssmlEnableProsody?: boolean
    ssmlEnableEmphasis?: boolean
    ssmlEnablePhonemes?: boolean
    ssmlFormality?: string
    ssmlMaxBreaksPer100Words?: number
    defaultMode?: string
    autoSendInAutoMode?: boolean
    pttKeybinding?: string
    keepConversationHistory?: boolean
    retentionDays?: number
    loggingLevel?: string
    metricsEnabled?: boolean
    backendUrl?: string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    inputDeviceId?: NullableStringFieldUpdateOperationsInput | string | null
    sampleRate?: IntFieldUpdateOperationsInput | number
    noiseSuppressionEnabled?: BoolFieldUpdateOperationsInput | boolean
    vadThreshold?: FloatFieldUpdateOperationsInput | number
    minSilenceMs?: IntFieldUpdateOperationsInput | number
    maxUtteranceMs?: IntFieldUpdateOperationsInput | number
    minSpeechMs?: IntFieldUpdateOperationsInput | number
    trimLongSilences?: BoolFieldUpdateOperationsInput | boolean
    maxChunkLengthMs?: IntFieldUpdateOperationsInput | number
    sttProvider?: StringFieldUpdateOperationsInput | string
    sttModel?: StringFieldUpdateOperationsInput | string
    sttLocale?: StringFieldUpdateOperationsInput | string
    sttEncoding?: StringFieldUpdateOperationsInput | string
    sendPartials?: BoolFieldUpdateOperationsInput | boolean
    ttsProvider?: StringFieldUpdateOperationsInput | string
    ttsVoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    ttsModel?: StringFieldUpdateOperationsInput | string
    ttsStreamPlayback?: BoolFieldUpdateOperationsInput | boolean
    ttsAutoplay?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    ssmlEnableProsody?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnableEmphasis?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnablePhonemes?: BoolFieldUpdateOperationsInput | boolean
    ssmlFormality?: StringFieldUpdateOperationsInput | string
    ssmlMaxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    defaultMode?: StringFieldUpdateOperationsInput | string
    autoSendInAutoMode?: BoolFieldUpdateOperationsInput | boolean
    pttKeybinding?: StringFieldUpdateOperationsInput | string
    keepConversationHistory?: BoolFieldUpdateOperationsInput | boolean
    retentionDays?: IntFieldUpdateOperationsInput | number
    loggingLevel?: StringFieldUpdateOperationsInput | string
    metricsEnabled?: BoolFieldUpdateOperationsInput | boolean
    backendUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    inputDeviceId?: NullableStringFieldUpdateOperationsInput | string | null
    sampleRate?: IntFieldUpdateOperationsInput | number
    noiseSuppressionEnabled?: BoolFieldUpdateOperationsInput | boolean
    vadThreshold?: FloatFieldUpdateOperationsInput | number
    minSilenceMs?: IntFieldUpdateOperationsInput | number
    maxUtteranceMs?: IntFieldUpdateOperationsInput | number
    minSpeechMs?: IntFieldUpdateOperationsInput | number
    trimLongSilences?: BoolFieldUpdateOperationsInput | boolean
    maxChunkLengthMs?: IntFieldUpdateOperationsInput | number
    sttProvider?: StringFieldUpdateOperationsInput | string
    sttModel?: StringFieldUpdateOperationsInput | string
    sttLocale?: StringFieldUpdateOperationsInput | string
    sttEncoding?: StringFieldUpdateOperationsInput | string
    sendPartials?: BoolFieldUpdateOperationsInput | boolean
    ttsProvider?: StringFieldUpdateOperationsInput | string
    ttsVoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    ttsModel?: StringFieldUpdateOperationsInput | string
    ttsStreamPlayback?: BoolFieldUpdateOperationsInput | boolean
    ttsAutoplay?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    ssmlEnableProsody?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnableEmphasis?: BoolFieldUpdateOperationsInput | boolean
    ssmlEnablePhonemes?: BoolFieldUpdateOperationsInput | boolean
    ssmlFormality?: StringFieldUpdateOperationsInput | string
    ssmlMaxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    defaultMode?: StringFieldUpdateOperationsInput | string
    autoSendInAutoMode?: BoolFieldUpdateOperationsInput | boolean
    pttKeybinding?: StringFieldUpdateOperationsInput | string
    keepConversationHistory?: BoolFieldUpdateOperationsInput | boolean
    retentionDays?: IntFieldUpdateOperationsInput | number
    loggingLevel?: StringFieldUpdateOperationsInput | string
    metricsEnabled?: BoolFieldUpdateOperationsInput | boolean
    backendUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContextCreateInput = {
    id?: string
    projectPath: string
    projectName: string
    claudeMdPath?: string | null
    devCommand?: string | null
    buildCommand?: string | null
    testCommand?: string | null
    stopCommand?: string | null
    settings?: string | null
    createdAt?: Date | string
    lastAccessedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutProjectContextInput
  }

  export type ProjectContextUncheckedCreateInput = {
    id?: string
    conversationId: string
    projectPath: string
    projectName: string
    claudeMdPath?: string | null
    devCommand?: string | null
    buildCommand?: string | null
    testCommand?: string | null
    stopCommand?: string | null
    settings?: string | null
    createdAt?: Date | string
    lastAccessedAt?: Date | string
  }

  export type ProjectContextUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutProjectContextNestedInput
  }

  export type ProjectContextUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContextCreateManyInput = {
    id?: string
    conversationId: string
    projectPath: string
    projectName: string
    claudeMdPath?: string | null
    devCommand?: string | null
    buildCommand?: string | null
    testCommand?: string | null
    stopCommand?: string | null
    settings?: string | null
    createdAt?: Date | string
    lastAccessedAt?: Date | string
  }

  export type ProjectContextUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContextUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateInput = {
    id?: string
    conversationId: string
    projectPath?: string | null
    title: string
    description?: string | null
    status?: $Enums.TodoStatus
    priority?: $Enums.Priority | null
    tags?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
    blockedReason?: string | null
    assignee?: string | null
    metadata?: string | null
  }

  export type TodoUncheckedCreateInput = {
    id?: string
    conversationId: string
    projectPath?: string | null
    title: string
    description?: string | null
    status?: $Enums.TodoStatus
    priority?: $Enums.Priority | null
    tags?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
    blockedReason?: string | null
    assignee?: string | null
    metadata?: string | null
  }

  export type TodoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockedReason?: NullableStringFieldUpdateOperationsInput | string | null
    assignee?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TodoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockedReason?: NullableStringFieldUpdateOperationsInput | string | null
    assignee?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TodoCreateManyInput = {
    id?: string
    conversationId: string
    projectPath?: string | null
    title: string
    description?: string | null
    status?: $Enums.TodoStatus
    priority?: $Enums.Priority | null
    tags?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
    blockedReason?: string | null
    assignee?: string | null
    metadata?: string | null
  }

  export type TodoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockedReason?: NullableStringFieldUpdateOperationsInput | string | null
    assignee?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TodoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    projectPath?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockedReason?: NullableStringFieldUpdateOperationsInput | string | null
    assignee?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ApiKeyNullableScalarRelationFilter = {
    is?: ApiKeyWhereInput | null
    isNot?: ApiKeyWhereInput | null
  }

  export type VoiceConfigNullableScalarRelationFilter = {
    is?: VoiceConfigWhereInput | null
    isNot?: VoiceConfigWhereInput | null
  }

  export type ProjectContextNullableScalarRelationFilter = {
    is?: ProjectContextWhereInput | null
    isNot?: ProjectContextWhereInput | null
  }

  export type ClaudeConfigNullableScalarRelationFilter = {
    is?: ClaudeConfigWhereInput | null
    isNot?: ClaudeConfigWhereInput | null
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messageCount?: SortOrder
  }

  export type ConversationAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messageCount?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messageCount?: SortOrder
  }

  export type ConversationSumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    ssmlUsed?: SortOrder
    timestamp?: SortOrder
    metrics?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    ssmlUsed?: SortOrder
    timestamp?: SortOrder
    metrics?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    ssmlUsed?: SortOrder
    timestamp?: SortOrder
    metrics?: SortOrder
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    openai?: SortOrder
    elevenlabs?: SortOrder
    gemini?: SortOrder
    anthropic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    openai?: SortOrder
    elevenlabs?: SortOrder
    gemini?: SortOrder
    anthropic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    openai?: SortOrder
    elevenlabs?: SortOrder
    gemini?: SortOrder
    anthropic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VoiceConfigCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    voiceId?: SortOrder
    model?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    prosodyEnabled?: SortOrder
    emphasisEnabled?: SortOrder
    phonemesEnabled?: SortOrder
    formality?: SortOrder
    maxBreaksPer100Words?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoiceConfigAvgOrderByAggregateInput = {
    maxBreaksPer100Words?: SortOrder
  }

  export type VoiceConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    voiceId?: SortOrder
    model?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    prosodyEnabled?: SortOrder
    emphasisEnabled?: SortOrder
    phonemesEnabled?: SortOrder
    formality?: SortOrder
    maxBreaksPer100Words?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoiceConfigMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    voiceId?: SortOrder
    model?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    prosodyEnabled?: SortOrder
    emphasisEnabled?: SortOrder
    phonemesEnabled?: SortOrder
    formality?: SortOrder
    maxBreaksPer100Words?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoiceConfigSumOrderByAggregateInput = {
    maxBreaksPer100Words?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClaudeConfigCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    systemPromptTemplate?: SortOrder
    voiceEnabled?: SortOrder
    voiceDirectives?: SortOrder
    model?: SortOrder
    maxTurns?: SortOrder
    permissionMode?: SortOrder
    allowedTools?: SortOrder
    disallowedTools?: SortOrder
    mcpServers?: SortOrder
    customInstructions?: SortOrder
    templateVars?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaudeConfigAvgOrderByAggregateInput = {
    maxTurns?: SortOrder
  }

  export type ClaudeConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    systemPromptTemplate?: SortOrder
    voiceEnabled?: SortOrder
    voiceDirectives?: SortOrder
    model?: SortOrder
    maxTurns?: SortOrder
    permissionMode?: SortOrder
    allowedTools?: SortOrder
    disallowedTools?: SortOrder
    mcpServers?: SortOrder
    customInstructions?: SortOrder
    templateVars?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaudeConfigMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    systemPromptTemplate?: SortOrder
    voiceEnabled?: SortOrder
    voiceDirectives?: SortOrder
    model?: SortOrder
    maxTurns?: SortOrder
    permissionMode?: SortOrder
    allowedTools?: SortOrder
    disallowedTools?: SortOrder
    mcpServers?: SortOrder
    customInstructions?: SortOrder
    templateVars?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaudeConfigSumOrderByAggregateInput = {
    maxTurns?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    inputDeviceId?: SortOrder
    sampleRate?: SortOrder
    noiseSuppressionEnabled?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    trimLongSilences?: SortOrder
    maxChunkLengthMs?: SortOrder
    sttProvider?: SortOrder
    sttModel?: SortOrder
    sttLocale?: SortOrder
    sttEncoding?: SortOrder
    sendPartials?: SortOrder
    ttsProvider?: SortOrder
    ttsVoiceId?: SortOrder
    ttsModel?: SortOrder
    ttsStreamPlayback?: SortOrder
    ttsAutoplay?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    ssmlEnableProsody?: SortOrder
    ssmlEnableEmphasis?: SortOrder
    ssmlEnablePhonemes?: SortOrder
    ssmlFormality?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    defaultMode?: SortOrder
    autoSendInAutoMode?: SortOrder
    pttKeybinding?: SortOrder
    keepConversationHistory?: SortOrder
    retentionDays?: SortOrder
    loggingLevel?: SortOrder
    metricsEnabled?: SortOrder
    backendUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    sampleRate?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    maxChunkLengthMs?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    retentionDays?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    inputDeviceId?: SortOrder
    sampleRate?: SortOrder
    noiseSuppressionEnabled?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    trimLongSilences?: SortOrder
    maxChunkLengthMs?: SortOrder
    sttProvider?: SortOrder
    sttModel?: SortOrder
    sttLocale?: SortOrder
    sttEncoding?: SortOrder
    sendPartials?: SortOrder
    ttsProvider?: SortOrder
    ttsVoiceId?: SortOrder
    ttsModel?: SortOrder
    ttsStreamPlayback?: SortOrder
    ttsAutoplay?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    ssmlEnableProsody?: SortOrder
    ssmlEnableEmphasis?: SortOrder
    ssmlEnablePhonemes?: SortOrder
    ssmlFormality?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    defaultMode?: SortOrder
    autoSendInAutoMode?: SortOrder
    pttKeybinding?: SortOrder
    keepConversationHistory?: SortOrder
    retentionDays?: SortOrder
    loggingLevel?: SortOrder
    metricsEnabled?: SortOrder
    backendUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    inputDeviceId?: SortOrder
    sampleRate?: SortOrder
    noiseSuppressionEnabled?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    trimLongSilences?: SortOrder
    maxChunkLengthMs?: SortOrder
    sttProvider?: SortOrder
    sttModel?: SortOrder
    sttLocale?: SortOrder
    sttEncoding?: SortOrder
    sendPartials?: SortOrder
    ttsProvider?: SortOrder
    ttsVoiceId?: SortOrder
    ttsModel?: SortOrder
    ttsStreamPlayback?: SortOrder
    ttsAutoplay?: SortOrder
    ssmlEnabled?: SortOrder
    ssmlModel?: SortOrder
    ssmlEnableProsody?: SortOrder
    ssmlEnableEmphasis?: SortOrder
    ssmlEnablePhonemes?: SortOrder
    ssmlFormality?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    defaultMode?: SortOrder
    autoSendInAutoMode?: SortOrder
    pttKeybinding?: SortOrder
    keepConversationHistory?: SortOrder
    retentionDays?: SortOrder
    loggingLevel?: SortOrder
    metricsEnabled?: SortOrder
    backendUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsSumOrderByAggregateInput = {
    id?: SortOrder
    sampleRate?: SortOrder
    vadThreshold?: SortOrder
    minSilenceMs?: SortOrder
    maxUtteranceMs?: SortOrder
    minSpeechMs?: SortOrder
    maxChunkLengthMs?: SortOrder
    ssmlMaxBreaksPer100Words?: SortOrder
    retentionDays?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProjectContextCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    projectName?: SortOrder
    claudeMdPath?: SortOrder
    devCommand?: SortOrder
    buildCommand?: SortOrder
    testCommand?: SortOrder
    stopCommand?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type ProjectContextMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    projectName?: SortOrder
    claudeMdPath?: SortOrder
    devCommand?: SortOrder
    buildCommand?: SortOrder
    testCommand?: SortOrder
    stopCommand?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type ProjectContextMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    projectName?: SortOrder
    claudeMdPath?: SortOrder
    devCommand?: SortOrder
    buildCommand?: SortOrder
    testCommand?: SortOrder
    stopCommand?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type EnumTodoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[]
    notIn?: $Enums.TodoStatus[]
    not?: NestedEnumTodoStatusFilter<$PrismaModel> | $Enums.TodoStatus
  }

  export type EnumPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | null
    notIn?: $Enums.Priority[] | null
    not?: NestedEnumPriorityNullableFilter<$PrismaModel> | $Enums.Priority | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TodoCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
    blockedReason?: SortOrder
    assignee?: SortOrder
    metadata?: SortOrder
  }

  export type TodoMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
    blockedReason?: SortOrder
    assignee?: SortOrder
    metadata?: SortOrder
  }

  export type TodoMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    projectPath?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
    blockedReason?: SortOrder
    assignee?: SortOrder
    metadata?: SortOrder
  }

  export type EnumTodoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[]
    notIn?: $Enums.TodoStatus[]
    not?: NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel> | $Enums.TodoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTodoStatusFilter<$PrismaModel>
    _max?: NestedEnumTodoStatusFilter<$PrismaModel>
  }

  export type EnumPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | null
    notIn?: $Enums.Priority[] | null
    not?: NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ConversationCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConversationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProjectInput | ConversationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProjectInput | ConversationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProjectInput | ConversationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput> | ConversationCreateWithoutProjectInput[] | ConversationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectInput | ConversationCreateOrConnectWithoutProjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProjectInput | ConversationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConversationCreateManyProjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProjectInput | ConversationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProjectInput | ConversationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutConversationsInput = {
    create?: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConversationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedOneWithoutConversationInput = {
    create?: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutConversationInput
    connect?: ApiKeyWhereUniqueInput
  }

  export type VoiceConfigCreateNestedOneWithoutConversationInput = {
    create?: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: VoiceConfigCreateOrConnectWithoutConversationInput
    connect?: VoiceConfigWhereUniqueInput
  }

  export type ProjectContextCreateNestedOneWithoutConversationInput = {
    create?: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ProjectContextCreateOrConnectWithoutConversationInput
    connect?: ProjectContextWhereUniqueInput
  }

  export type ClaudeConfigCreateNestedOneWithoutConversationInput = {
    create?: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ClaudeConfigCreateOrConnectWithoutConversationInput
    connect?: ClaudeConfigWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedOneWithoutConversationInput = {
    create?: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutConversationInput
    connect?: ApiKeyWhereUniqueInput
  }

  export type VoiceConfigUncheckedCreateNestedOneWithoutConversationInput = {
    create?: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: VoiceConfigCreateOrConnectWithoutConversationInput
    connect?: VoiceConfigWhereUniqueInput
  }

  export type ProjectContextUncheckedCreateNestedOneWithoutConversationInput = {
    create?: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ProjectContextCreateOrConnectWithoutConversationInput
    connect?: ProjectContextWhereUniqueInput
  }

  export type ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput = {
    create?: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ClaudeConfigCreateOrConnectWithoutConversationInput
    connect?: ClaudeConfigWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConversationsInput
    upsert?: ProjectUpsertWithoutConversationsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutConversationsInput, ProjectUpdateWithoutConversationsInput>, ProjectUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ApiKeyUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutConversationInput
    upsert?: ApiKeyUpsertWithoutConversationInput
    disconnect?: ApiKeyWhereInput | boolean
    delete?: ApiKeyWhereInput | boolean
    connect?: ApiKeyWhereUniqueInput
    update?: XOR<XOR<ApiKeyUpdateToOneWithWhereWithoutConversationInput, ApiKeyUpdateWithoutConversationInput>, ApiKeyUncheckedUpdateWithoutConversationInput>
  }

  export type VoiceConfigUpdateOneWithoutConversationNestedInput = {
    create?: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: VoiceConfigCreateOrConnectWithoutConversationInput
    upsert?: VoiceConfigUpsertWithoutConversationInput
    disconnect?: VoiceConfigWhereInput | boolean
    delete?: VoiceConfigWhereInput | boolean
    connect?: VoiceConfigWhereUniqueInput
    update?: XOR<XOR<VoiceConfigUpdateToOneWithWhereWithoutConversationInput, VoiceConfigUpdateWithoutConversationInput>, VoiceConfigUncheckedUpdateWithoutConversationInput>
  }

  export type ProjectContextUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ProjectContextCreateOrConnectWithoutConversationInput
    upsert?: ProjectContextUpsertWithoutConversationInput
    disconnect?: ProjectContextWhereInput | boolean
    delete?: ProjectContextWhereInput | boolean
    connect?: ProjectContextWhereUniqueInput
    update?: XOR<XOR<ProjectContextUpdateToOneWithWhereWithoutConversationInput, ProjectContextUpdateWithoutConversationInput>, ProjectContextUncheckedUpdateWithoutConversationInput>
  }

  export type ClaudeConfigUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ClaudeConfigCreateOrConnectWithoutConversationInput
    upsert?: ClaudeConfigUpsertWithoutConversationInput
    disconnect?: ClaudeConfigWhereInput | boolean
    delete?: ClaudeConfigWhereInput | boolean
    connect?: ClaudeConfigWhereUniqueInput
    update?: XOR<XOR<ClaudeConfigUpdateToOneWithWhereWithoutConversationInput, ClaudeConfigUpdateWithoutConversationInput>, ClaudeConfigUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutConversationInput
    upsert?: ApiKeyUpsertWithoutConversationInput
    disconnect?: ApiKeyWhereInput | boolean
    delete?: ApiKeyWhereInput | boolean
    connect?: ApiKeyWhereUniqueInput
    update?: XOR<XOR<ApiKeyUpdateToOneWithWhereWithoutConversationInput, ApiKeyUpdateWithoutConversationInput>, ApiKeyUncheckedUpdateWithoutConversationInput>
  }

  export type VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput = {
    create?: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: VoiceConfigCreateOrConnectWithoutConversationInput
    upsert?: VoiceConfigUpsertWithoutConversationInput
    disconnect?: VoiceConfigWhereInput | boolean
    delete?: VoiceConfigWhereInput | boolean
    connect?: VoiceConfigWhereUniqueInput
    update?: XOR<XOR<VoiceConfigUpdateToOneWithWhereWithoutConversationInput, VoiceConfigUpdateWithoutConversationInput>, VoiceConfigUncheckedUpdateWithoutConversationInput>
  }

  export type ProjectContextUncheckedUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ProjectContextCreateOrConnectWithoutConversationInput
    upsert?: ProjectContextUpsertWithoutConversationInput
    disconnect?: ProjectContextWhereInput | boolean
    delete?: ProjectContextWhereInput | boolean
    connect?: ProjectContextWhereUniqueInput
    update?: XOR<XOR<ProjectContextUpdateToOneWithWhereWithoutConversationInput, ProjectContextUpdateWithoutConversationInput>, ProjectContextUncheckedUpdateWithoutConversationInput>
  }

  export type ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput = {
    create?: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
    connectOrCreate?: ClaudeConfigCreateOrConnectWithoutConversationInput
    upsert?: ClaudeConfigUpsertWithoutConversationInput
    disconnect?: ClaudeConfigWhereInput | boolean
    delete?: ClaudeConfigWhereInput | boolean
    connect?: ClaudeConfigWhereUniqueInput
    update?: XOR<XOR<ClaudeConfigUpdateToOneWithWhereWithoutConversationInput, ClaudeConfigUpdateWithoutConversationInput>, ClaudeConfigUncheckedUpdateWithoutConversationInput>
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<ConversationCreateWithoutApiKeysInput, ConversationUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutApiKeysInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<ConversationCreateWithoutApiKeysInput, ConversationUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutApiKeysInput
    upsert?: ConversationUpsertWithoutApiKeysInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutApiKeysInput, ConversationUpdateWithoutApiKeysInput>, ConversationUncheckedUpdateWithoutApiKeysInput>
  }

  export type ConversationCreateNestedOneWithoutVoiceConfigInput = {
    create?: XOR<ConversationCreateWithoutVoiceConfigInput, ConversationUncheckedCreateWithoutVoiceConfigInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutVoiceConfigInput
    connect?: ConversationWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConversationUpdateOneRequiredWithoutVoiceConfigNestedInput = {
    create?: XOR<ConversationCreateWithoutVoiceConfigInput, ConversationUncheckedCreateWithoutVoiceConfigInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutVoiceConfigInput
    upsert?: ConversationUpsertWithoutVoiceConfigInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutVoiceConfigInput, ConversationUpdateWithoutVoiceConfigInput>, ConversationUncheckedUpdateWithoutVoiceConfigInput>
  }

  export type ConversationCreateNestedOneWithoutClaudeConfigInput = {
    create?: XOR<ConversationCreateWithoutClaudeConfigInput, ConversationUncheckedCreateWithoutClaudeConfigInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutClaudeConfigInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutClaudeConfigNestedInput = {
    create?: XOR<ConversationCreateWithoutClaudeConfigInput, ConversationUncheckedCreateWithoutClaudeConfigInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutClaudeConfigInput
    upsert?: ConversationUpsertWithoutClaudeConfigInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutClaudeConfigInput, ConversationUpdateWithoutClaudeConfigInput>, ConversationUncheckedUpdateWithoutClaudeConfigInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConversationCreateNestedOneWithoutProjectContextInput = {
    create?: XOR<ConversationCreateWithoutProjectContextInput, ConversationUncheckedCreateWithoutProjectContextInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectContextInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutProjectContextNestedInput = {
    create?: XOR<ConversationCreateWithoutProjectContextInput, ConversationUncheckedCreateWithoutProjectContextInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutProjectContextInput
    upsert?: ConversationUpsertWithoutProjectContextInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutProjectContextInput, ConversationUpdateWithoutProjectContextInput>, ConversationUncheckedUpdateWithoutProjectContextInput>
  }

  export type EnumTodoStatusFieldUpdateOperationsInput = {
    set?: $Enums.TodoStatus
  }

  export type NullableEnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumTodoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[]
    notIn?: $Enums.TodoStatus[]
    not?: NestedEnumTodoStatusFilter<$PrismaModel> | $Enums.TodoStatus
  }

  export type NestedEnumPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | null
    notIn?: $Enums.Priority[] | null
    not?: NestedEnumPriorityNullableFilter<$PrismaModel> | $Enums.Priority | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[]
    notIn?: $Enums.TodoStatus[]
    not?: NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel> | $Enums.TodoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTodoStatusFilter<$PrismaModel>
    _max?: NestedEnumTodoStatusFilter<$PrismaModel>
  }

  export type NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | null
    notIn?: $Enums.Priority[] | null
    not?: NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ConversationCreateWithoutProjectInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutProjectInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput>
  }

  export type ConversationCreateManyProjectInputEnvelope = {
    data: ConversationCreateManyProjectInput | ConversationCreateManyProjectInput[]
  }

  export type ConversationUpsertWithWhereUniqueWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutProjectInput, ConversationUncheckedUpdateWithoutProjectInput>
    create: XOR<ConversationCreateWithoutProjectInput, ConversationUncheckedCreateWithoutProjectInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutProjectInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutProjectInput, ConversationUncheckedUpdateWithoutProjectInput>
  }

  export type ConversationUpdateManyWithWhereWithoutProjectInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutProjectInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    projectId?: StringNullableFilter<"Conversation"> | string | null
    name?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messageCount?: IntFilter<"Conversation"> | number
  }

  export type ProjectCreateWithoutConversationsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateWithoutConversationsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutConversationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
  }

  export type ApiKeyCreateWithoutConversationInput = {
    id?: string
    openai?: string | null
    elevenlabs?: string | null
    gemini?: string | null
    anthropic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutConversationInput = {
    id?: string
    openai?: string | null
    elevenlabs?: string | null
    gemini?: string | null
    anthropic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutConversationInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
  }

  export type VoiceConfigCreateWithoutConversationInput = {
    id?: string
    voiceId?: string | null
    model?: string
    ssmlEnabled?: boolean
    ssmlModel?: string
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: string
    maxBreaksPer100Words?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoiceConfigUncheckedCreateWithoutConversationInput = {
    id?: string
    voiceId?: string | null
    model?: string
    ssmlEnabled?: boolean
    ssmlModel?: string
    prosodyEnabled?: boolean
    emphasisEnabled?: boolean
    phonemesEnabled?: boolean
    formality?: string
    maxBreaksPer100Words?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoiceConfigCreateOrConnectWithoutConversationInput = {
    where: VoiceConfigWhereUniqueInput
    create: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
  }

  export type ProjectContextCreateWithoutConversationInput = {
    id?: string
    projectPath: string
    projectName: string
    claudeMdPath?: string | null
    devCommand?: string | null
    buildCommand?: string | null
    testCommand?: string | null
    stopCommand?: string | null
    settings?: string | null
    createdAt?: Date | string
    lastAccessedAt?: Date | string
  }

  export type ProjectContextUncheckedCreateWithoutConversationInput = {
    id?: string
    projectPath: string
    projectName: string
    claudeMdPath?: string | null
    devCommand?: string | null
    buildCommand?: string | null
    testCommand?: string | null
    stopCommand?: string | null
    settings?: string | null
    createdAt?: Date | string
    lastAccessedAt?: Date | string
  }

  export type ProjectContextCreateOrConnectWithoutConversationInput = {
    where: ProjectContextWhereUniqueInput
    create: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
  }

  export type ClaudeConfigCreateWithoutConversationInput = {
    id?: string
    systemPromptTemplate?: string | null
    voiceEnabled?: boolean
    voiceDirectives?: string | null
    model?: string
    maxTurns?: number
    permissionMode?: string
    allowedTools?: string | null
    disallowedTools?: string | null
    mcpServers?: string | null
    customInstructions?: string | null
    templateVars?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaudeConfigUncheckedCreateWithoutConversationInput = {
    id?: string
    systemPromptTemplate?: string | null
    voiceEnabled?: boolean
    voiceDirectives?: string | null
    model?: string
    maxTurns?: number
    permissionMode?: string
    allowedTools?: string | null
    disallowedTools?: string | null
    mcpServers?: string | null
    customInstructions?: string | null
    templateVars?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaudeConfigCreateOrConnectWithoutConversationInput = {
    where: ClaudeConfigWhereUniqueInput
    create: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
  }

  export type ProjectUpsertWithoutConversationsInput = {
    update: XOR<ProjectUpdateWithoutConversationsInput, ProjectUncheckedUpdateWithoutConversationsInput>
    create: XOR<ProjectCreateWithoutConversationsInput, ProjectUncheckedCreateWithoutConversationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutConversationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutConversationsInput, ProjectUncheckedUpdateWithoutConversationsInput>
  }

  export type ProjectUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    ssmlUsed?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metrics?: StringNullableFilter<"Message"> | string | null
  }

  export type ApiKeyUpsertWithoutConversationInput = {
    update: XOR<ApiKeyUpdateWithoutConversationInput, ApiKeyUncheckedUpdateWithoutConversationInput>
    create: XOR<ApiKeyCreateWithoutConversationInput, ApiKeyUncheckedCreateWithoutConversationInput>
    where?: ApiKeyWhereInput
  }

  export type ApiKeyUpdateToOneWithWhereWithoutConversationInput = {
    where?: ApiKeyWhereInput
    data: XOR<ApiKeyUpdateWithoutConversationInput, ApiKeyUncheckedUpdateWithoutConversationInput>
  }

  export type ApiKeyUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    openai?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs?: NullableStringFieldUpdateOperationsInput | string | null
    gemini?: NullableStringFieldUpdateOperationsInput | string | null
    anthropic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceConfigUpsertWithoutConversationInput = {
    update: XOR<VoiceConfigUpdateWithoutConversationInput, VoiceConfigUncheckedUpdateWithoutConversationInput>
    create: XOR<VoiceConfigCreateWithoutConversationInput, VoiceConfigUncheckedCreateWithoutConversationInput>
    where?: VoiceConfigWhereInput
  }

  export type VoiceConfigUpdateToOneWithWhereWithoutConversationInput = {
    where?: VoiceConfigWhereInput
    data: XOR<VoiceConfigUpdateWithoutConversationInput, VoiceConfigUncheckedUpdateWithoutConversationInput>
  }

  export type VoiceConfigUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceConfigUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    ssmlEnabled?: BoolFieldUpdateOperationsInput | boolean
    ssmlModel?: StringFieldUpdateOperationsInput | string
    prosodyEnabled?: BoolFieldUpdateOperationsInput | boolean
    emphasisEnabled?: BoolFieldUpdateOperationsInput | boolean
    phonemesEnabled?: BoolFieldUpdateOperationsInput | boolean
    formality?: StringFieldUpdateOperationsInput | string
    maxBreaksPer100Words?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContextUpsertWithoutConversationInput = {
    update: XOR<ProjectContextUpdateWithoutConversationInput, ProjectContextUncheckedUpdateWithoutConversationInput>
    create: XOR<ProjectContextCreateWithoutConversationInput, ProjectContextUncheckedCreateWithoutConversationInput>
    where?: ProjectContextWhereInput
  }

  export type ProjectContextUpdateToOneWithWhereWithoutConversationInput = {
    where?: ProjectContextWhereInput
    data: XOR<ProjectContextUpdateWithoutConversationInput, ProjectContextUncheckedUpdateWithoutConversationInput>
  }

  export type ProjectContextUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContextUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectPath?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    claudeMdPath?: NullableStringFieldUpdateOperationsInput | string | null
    devCommand?: NullableStringFieldUpdateOperationsInput | string | null
    buildCommand?: NullableStringFieldUpdateOperationsInput | string | null
    testCommand?: NullableStringFieldUpdateOperationsInput | string | null
    stopCommand?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaudeConfigUpsertWithoutConversationInput = {
    update: XOR<ClaudeConfigUpdateWithoutConversationInput, ClaudeConfigUncheckedUpdateWithoutConversationInput>
    create: XOR<ClaudeConfigCreateWithoutConversationInput, ClaudeConfigUncheckedCreateWithoutConversationInput>
    where?: ClaudeConfigWhereInput
  }

  export type ClaudeConfigUpdateToOneWithWhereWithoutConversationInput = {
    where?: ClaudeConfigWhereInput
    data: XOR<ClaudeConfigUpdateWithoutConversationInput, ClaudeConfigUncheckedUpdateWithoutConversationInput>
  }

  export type ClaudeConfigUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaudeConfigUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPromptTemplate?: NullableStringFieldUpdateOperationsInput | string | null
    voiceEnabled?: BoolFieldUpdateOperationsInput | boolean
    voiceDirectives?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    maxTurns?: IntFieldUpdateOperationsInput | number
    permissionMode?: StringFieldUpdateOperationsInput | string
    allowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    disallowedTools?: NullableStringFieldUpdateOperationsInput | string | null
    mcpServers?: NullableStringFieldUpdateOperationsInput | string | null
    customInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    templateVars?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateWithoutApiKeysInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutApiKeysInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutApiKeysInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutApiKeysInput, ConversationUncheckedCreateWithoutApiKeysInput>
  }

  export type ConversationUpsertWithoutApiKeysInput = {
    update: XOR<ConversationUpdateWithoutApiKeysInput, ConversationUncheckedUpdateWithoutApiKeysInput>
    create: XOR<ConversationCreateWithoutApiKeysInput, ConversationUncheckedCreateWithoutApiKeysInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutApiKeysInput, ConversationUncheckedUpdateWithoutApiKeysInput>
  }

  export type ConversationUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateWithoutVoiceConfigInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutVoiceConfigInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutVoiceConfigInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutVoiceConfigInput, ConversationUncheckedCreateWithoutVoiceConfigInput>
  }

  export type ConversationUpsertWithoutVoiceConfigInput = {
    update: XOR<ConversationUpdateWithoutVoiceConfigInput, ConversationUncheckedUpdateWithoutVoiceConfigInput>
    create: XOR<ConversationCreateWithoutVoiceConfigInput, ConversationUncheckedCreateWithoutVoiceConfigInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutVoiceConfigInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutVoiceConfigInput, ConversationUncheckedUpdateWithoutVoiceConfigInput>
  }

  export type ConversationUpdateWithoutVoiceConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutVoiceConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateWithoutClaudeConfigInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutClaudeConfigInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    projectContext?: ProjectContextUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutClaudeConfigInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutClaudeConfigInput, ConversationUncheckedCreateWithoutClaudeConfigInput>
  }

  export type ConversationUpsertWithoutClaudeConfigInput = {
    update: XOR<ConversationUpdateWithoutClaudeConfigInput, ConversationUncheckedUpdateWithoutClaudeConfigInput>
    create: XOR<ConversationCreateWithoutClaudeConfigInput, ConversationUncheckedCreateWithoutClaudeConfigInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutClaudeConfigInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutClaudeConfigInput, ConversationUncheckedUpdateWithoutClaudeConfigInput>
  }

  export type ConversationUpdateWithoutClaudeConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutClaudeConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateWithoutProjectContextInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    project?: ProjectCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigCreateNestedOneWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutProjectContextInput = {
    id?: string
    projectId?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    apiKeys?: ApiKeyUncheckedCreateNestedOneWithoutConversationInput
    voiceConfig?: VoiceConfigUncheckedCreateNestedOneWithoutConversationInput
    claudeConfig?: ClaudeConfigUncheckedCreateNestedOneWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutProjectContextInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutProjectContextInput, ConversationUncheckedCreateWithoutProjectContextInput>
  }

  export type ConversationUpsertWithoutProjectContextInput = {
    update: XOR<ConversationUpdateWithoutProjectContextInput, ConversationUncheckedUpdateWithoutProjectContextInput>
    create: XOR<ConversationCreateWithoutProjectContextInput, ConversationUncheckedCreateWithoutProjectContextInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutProjectContextInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutProjectContextInput, ConversationUncheckedUpdateWithoutProjectContextInput>
  }

  export type ConversationUpdateWithoutProjectContextInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutProjectContextInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationCreateManyProjectInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messageCount?: number
  }

  export type ConversationUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    apiKeys?: ApiKeyUncheckedUpdateOneWithoutConversationNestedInput
    voiceConfig?: VoiceConfigUncheckedUpdateOneWithoutConversationNestedInput
    projectContext?: ProjectContextUncheckedUpdateOneWithoutConversationNestedInput
    claudeConfig?: ClaudeConfigUncheckedUpdateOneWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messageCount?: IntFieldUpdateOperationsInput | number
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    ssmlUsed?: string | null
    timestamp?: Date | string
    metrics?: string | null
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ssmlUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}