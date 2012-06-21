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
		
		el: $(".contact-type-view"),
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
				this.$el.find(".contact-type-list").append(this.template({"type": item}))
				//console.log(item);
				//console.log($(".contact-type-view"));
			},this);
			//this.getTypes();
			//return this;
		},
		getTypes: function(){
			//console.log(_.uniq(this.collection.pluck("type")));
			return  _.uniq(this.collection.pluck("type"));
		},
			events: {
			"click #new-contact-button" : "renderForm"
		},
		renderForm: function(){
			//contactsRouter.navigate("new");
			contactView.trigger("click:newContact");
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

	ContactFormView = Backbone.View.extend({
		//el: $(".contact-main-area"),
		className: "contact-form-container",
		template: _.template($("#contact-form-template").html()),
		initialize: function(){
			
		},
		render: function(){
			this.$el.html(this.template());
			return this;

		}
	})

	ContactsMainView = Backbone.View.extend({
		el: $(".contact-main-area"),

		initialize: function(){
			this.collection = new ContactCollection(contacts);
			this.render();
			this.collection.on("reset",this.render,this);
			this.on("click:filterType",this.filterByType,this);
			this.on("click:newContact",this.renderForm,this);


		},
		render: function(){

			this.$el.find("tr:has(td)").remove();
			_.each(this.collection.models,function(item){
				var cv = new ContactView({model: item});
				if(this.$el.find(".contact-list").length == 0){
					//this.$el.append()
				}
				this.$el.find(".contact-list").append(cv.render().el);
			},this)
		},
		renderForm: function(){
			this.$el.find(".contact-list").remove();
			var contactForm = new ContactFormView();
			this.$el.append(contactForm.render().el);
			

			//console.log(contactForm.render().el);

		},
		filterByType: function(){
			console.log("navigated to "+this.filterType);
			if(this.filterType == "all"){
				this.collection.reset(contacts);	
			}
			else{
				console.log("filterType is "+this.filterType);
				this.collection.reset(contacts, { silent: true });
				var filteredContacts = _.filter(this.collection.models,function(item){
						 return item.get("type") == this.filterType;
						// console.log(this.filterType);
						},this);

				this.collection.reset(filteredContacts);
		}
	}
	

	});

	ContactsRouter = Backbone.Router.extend({
		routes: {
			"type/:type" : "filterContact"
			
		},
		filterContact: function(type){
			contactView.filterType = type;
			contactView.trigger("click:filterType");
		}
		
			//console.log(contacts);
			//contactView.collection.reset(contacts);
		

	});



	var ctv = new ContactTypeView();
	var contactView = new ContactsMainView();
	var contactsRouter = new ContactsRouter();
	var cf = new ContactFormView();
	//cf.render();
	Backbone.history.start();
		
}(jQuery));
