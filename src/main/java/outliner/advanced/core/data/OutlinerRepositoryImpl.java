package outliner.advanced.core.data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.data.repository.NoRepositoryBean;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.io.Serializable;

@NoRepositoryBean
/**
 * Outliner repository implementation
 */
public class OutlinerRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
		implements OutlinerRepository<T, ID> {

	
	private static final Logger LOGGER = LoggerFactory.getLogger(OutlinerRepositoryImpl.class);
	
	/**
	 * The entity manager instance
	 */
	private final EntityManager em;
	private final ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
//	public OutlinerRepositoryImpl(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
//		super(entityInformation, entityManager);
//		
//		// TODO Auto-generated constructor stub
//	}
	
    public OutlinerRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.em = em;
    }

//	public OutlinerRepositoryImpl(Class<T> domainClass, EntityManager em) {
//		super(domainClass, em);
//		this.em = em;
//	}

	@Override
	public T saveFlushAndRefresh(T entity) {
		entity = super.saveAndFlush(entity);
		em.refresh(entity);
		return entity;
	}

//	@Override
//	public <R> Page<R> findAllProjections(Specification<T> spec, Class<R> projectionType, Pageable pageable) {
//		TypedQuery<T> query = getQuery(spec, pageable);
//		return readPageWithProjection(spec, projectionType, pageable, query);
//	}
//
//	private <R> Page<R> readPageWithProjection(Specification<T> spec, Class<R> projectionType, Pageable pageable,
//			TypedQuery<T> query) {
//		Page<T> result = (pageable == null) ? new PageImpl<T>(query.getResultList()) : readPage(query, pageable, spec);
//		return result.map(item -> projectionFactory.createProjection(projectionType, item));
//	}

}
