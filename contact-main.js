(function ($) {

	var contacts = [
					{name: "Vimal", email: "vc@v.com", mobile: 234321, address: "Bangalore", type: "family"},
					{name: "John", email: "w@v.com", mobile: 234321, address: "Chennai", type: "friend"},
					{name: "Kate", email: "vc@v.com", mobile: 234321, address: "Delhi", type: "office"},
					{name: "Brad", email: "nb@v.com", mobile: 234321, address: "Mangalore", type: "family"},
					{name: "Leo", email: "op@v.com", mobile: 2345421, address: "Bangalore", type: "office"},
					{name: "Clonney", email: "op@v.com", mobile: 2345421, address: "Pune", type: "office"}
				   ];	

	//console.log(contacts[2].name);	

	Contact = Backbone.Model.extend({	});		   

	ContactCollection = Backbone.Collection.extend({
		model: Contact
	});

	ContactTypeView = Backbone.View.extend({
		
		el: $(".contact-type-list"),
		template: _.template($("#contact-type-template").html()),

		initialize: function(){
			this.collection = new ContactCollection(contacts);	
			console.log(this.template);
			this.render();
		//	console.log("view inv");
		},
		render: function(){
			//console.log(this.collection.getByCid("c1"));
			_.each(this.getTypes(),function(item){
				//$(".contact-type-list").append(this.template({"type": item}))
				this.$el.append(this.template({"type": item}))
				//console.log(item);
				//console.log($(".contact-type-view"));
			},this);
			//this.getTypes();
			//return this;
		},
		getTypes: function(){
			//console.log(_.uniq(this.collection.pluck("type")));
			return  _.uniq(this.collection.pluck("type"));
		}


	});

	ContactView = Backbone.View.extend({
		tagName: "tr",
		template: _.template($("#contact-list-template").html()),
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	ContactsMainView = Backbone.View.extend({
		el: $(".contact-list"),

		initialize: function(){
			this.collection = new ContactCollection(contacts);
			this.render();

		},
		render: function(){
			_.each(this.collection.models,function(item){
				var cv = new ContactView({model: item});
				this.$el.append(cv.render().el);
			},this)
		}




	})



	var ctv = new ContactTypeView();
	var cmv = new ContactsMainView();
		
}(jQuery));
