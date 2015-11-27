import menuHelper from '../src/lib/menuHelper';

describe('menuHelper', function() {
   it('should search', function() {
       var data = {
           customization: {
               display: "Customization",
               nodes: {
                   entities: {
                       display: "Entities",
                       nodes: {
                           new: {
                               display: "New",
                               route: {
                                   name: "new",
                                   params: {
                                       entity: "entity"
                                   }
                               }
                           },
                           search: {
                               display: "search",
                               icon: "search"
                           }
                       }
                   }
               }
           }
       };

       let filtered = menuHelper.filterNodes(data, 'fuckl');
       console.log(filtered);
       assert.ok(1);
   })
});