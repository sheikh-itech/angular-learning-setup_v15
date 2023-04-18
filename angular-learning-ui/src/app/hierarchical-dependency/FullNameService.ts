
/* Can register using providedIn OR in providers[] array of Root/Main Module
 */

export class FullNameService {

  private name: any;

  constructor() {
    this.name = "Arham Vahleen";
  }

  public getName(): string {
    return this.name;
  }
}
